import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium as playwright } from 'playwright-core';
import chromium from '@sparticuz/chromium';
import { verifySourceArchive, SOURCE_ZIP_NAME } from '../src/pwa/source-archive.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.zip': 'application/zip',
};

export async function verifyBrowserOutput(outputDirectory = path.join(root, 'dist')) {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      let pathname = decodeURIComponent(url.pathname);
      const rawSource = pathname.startsWith('/raw-source/');
      if (rawSource) pathname = pathname.slice('/raw-source'.length);
      else if (pathname.startsWith('/jom-matematik-ppki/')) pathname = pathname.slice('/jom-matematik-ppki'.length);
      const base = path.resolve(rawSource ? root : outputDirectory);
      if (pathname.endsWith('/')) pathname += 'index.html';
      const file = path.resolve(base, `.${pathname}`);
      if (!file.startsWith(`${base}${path.sep}`)) throw new Error('Forbidden path');
      if (!(await stat(file)).isFile()) throw new Error('Not a file');
      response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      response.end(await readFile(file));
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not found');
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    let environment = process.env;
    if (!process.env.CHROME_EXECUTABLE_PATH && process.platform === 'linux') {
      const { default: lambdaModule } = await import('@sparticuz/chromium/build/lambdafs.js');
      const LambdaFS = lambdaModule.default || lambdaModule;
      const chromiumBuild = path.dirname(fileURLToPath(import.meta.resolve('@sparticuz/chromium')));
      const libraries = await LambdaFS.inflate(path.join(chromiumBuild, '../bin/al2023.tar.br'));
      environment = { ...process.env, LD_LIBRARY_PATH: `${libraries}/lib:${process.env.LD_LIBRARY_PATH || ''}` };
    }
    browser = await playwright.launch({
      headless: true,
      executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath(),
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--disable-gpu'],
      env: environment,
    });
    for (const prefix of ['/', '/jom-matematik-ppki/']) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const errors = [];
      const consoleMessages = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (['error', 'warning'].includes(message.type())) consoleMessages.push(message.text()); });
      await page.goto(`${origin}${prefix}`, { waitUntil: 'load' });
      try {
        await page.getByRole('heading', { name: /7 Modul Kurikulum/ }).waitFor({ timeout: 15_000 });
      } catch {
        throw new Error(`Blank screen at ${prefix}. Browser errors: ${errors.join(' | ')}. Text: ${(await page.locator('body').innerText()).slice(0, 500)}`);
      }
      assert.equal(errors.length, 0, errors.join('\n'));
      await page.waitForFunction(() => [...document.querySelectorAll('img')].every((image) => image.complete && image.naturalWidth > 0));
      if (prefix !== '/') {
        for (let module = 0; module < 7; module++) {
          await page.getByRole('button', { name: 'Mula', exact: true }).nth(module).click();
          await page.getByRole('heading', { name: new RegExp(`Modul ${module + 1}:`) }).waitFor();
          await page.getByTitle('Kembali ke Menu Utama').first().click();
          await page.getByRole('heading', { name: /7 Modul Kurikulum/ }).waitFor();
        }
        console.info('[Browser] All seven modules opened on the repository subfolder.');
      }
      try {
        await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), null, { timeout: 20_000 });
      } catch {
        const state = await page.evaluate(async () => ({
          registrations: (await navigator.serviceWorker.getRegistrations()).map((entry) => ({ scope: entry.scope, active: entry.active?.state, installing: entry.installing?.state, waiting: entry.waiting?.state })),
          caches: await caches.keys(),
          scripts: [...document.scripts].map((script) => ({ src: script.src, type: script.type })),
        }));
        throw new Error(`Service worker did not activate: ${JSON.stringify({ state, errors, consoleMessages })}`);
      }
      await context.setOffline(true);
      await page.reload({ waitUntil: 'load' });
      await page.getByRole('heading', { name: /7 Modul Kurikulum/ }).waitFor();
      console.info(`[Browser] Offline reload passed at ${prefix}`);
      if (prefix !== '/') {
        await page.getByRole('button', { name: 'Tetapan', exact: true }).click();
        await page.getByRole('button', { name: /PWA dan Kod Sumber/ }).click();
        await page.getByRole('button', { name: '1. Sediakan ZIP GitHub' }).click();
        await page.getByText('Semakan ZIP lulus.', { exact: true }).waitFor({ timeout: 30_000 });
        const downloadEvent = page.waitForEvent('download');
        await page.getByRole('link', { name: '2. Simpan ZIP GitHub' }).click();
        const download = await downloadEvent;
        assert.equal(download.suggestedFilename(), SOURCE_ZIP_NAME);
        const report = await verifySourceArchive(await readFile(await download.path()));
        console.info(`[Browser] Source ZIP downloaded offline and ${report.fileCount} files verified.`);
      }
      assert.equal(errors.length, 0, errors.join('\n'));
      await context.close();
      console.info(`[Browser] Home page rendered at ${prefix}`);
    }
    const regressions = [
      ['saved progress from an incomplete older version', () => {
        localStorage.setItem('jom_matematik_ppki_progress_v2', JSON.stringify({ userName: 'Aiman', stars: 9 }));
      }],
      ['saved settings containing JSON null', () => {
        localStorage.setItem('jom_matematik_ppki_settings_v2', 'null');
      }],
      ['older matchMedia implementation', () => {
        const original = window.matchMedia.bind(window);
        window.matchMedia = (query) => {
          const media = original(query);
          media.addEventListener = undefined;
          return media;
        };
      }],
      ['browser denying LocalStorage', () => {
        Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage blocked', 'SecurityError'); } });
      }],
    ];
    const failures = [];
    for (const [label, setup] of regressions) {
      const context = await browser.newContext();
      await context.addInitScript(setup);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`${origin}/jom-matematik-ppki/`, { waitUntil: 'load' });
      try {
        await page.getByRole('heading', { name: /7 Modul Kurikulum/ }).waitFor({ timeout: 5000 });
        assert.equal(errors.length, 0, errors.join(' | '));
        console.info(`[Browser] Passed: ${label}`);
      } catch {
        failures.push(`${label}: ${errors.join(' | ')}`);
      } finally {
        await context.close();
      }
    }
    assert.equal(failures.length, 0, `Blank screen regressions: ${failures.join('\n')}`);

    const rawContext = await browser.newContext();
    const rawPage = await rawContext.newPage();
    await rawPage.goto(`${origin}/raw-source/`, { waitUntil: 'load' });
    await rawPage.locator('#startup-title').filter({ hasText: 'Aplikasi belum dapat dibuka' }).waitFor({ timeout: 20_000 });
    assert.match(await rawPage.locator('#startup-panel').textContent(), /GitHub Actions/);
    await rawContext.close();
    console.info('[Browser] Incorrect raw-source deployment displays guidance instead of a blank screen.');

    const recoveryContext = await browser.newContext();
    const recoveryPage = await recoveryContext.newPage();
    await recoveryPage.goto(`${origin}/jom-matematik-ppki/`, { waitUntil: 'load' });
    await recoveryPage.getByRole('heading', { name: /7 Modul Kurikulum/ }).waitFor();
    await recoveryPage.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
    const savedProgress = await recoveryPage.evaluate(async () => {
      const otherCache = await caches.open('another-application-cache');
      await otherCache.put('/another-app-data', new Response('Keep this'));
      localStorage.setItem('another-app-key', 'Keep this');
      return localStorage.getItem('jom_matematik_ppki_progress_v2');
    });
    await recoveryPage.goto(`${origin}/jom-matematik-ppki/recovery.html`, { waitUntil: 'load' });
    await recoveryPage.getByRole('button', { name: 'Pulihkan Cache Aplikasi' }).click();
    await recoveryPage.getByRole('status').filter({ hasText: 'Cache aplikasi telah dipulihkan.' }).waitFor();
    const after = await recoveryPage.evaluate(async () => ({
      progress: localStorage.getItem('jom_matematik_ppki_progress_v2'),
      other: localStorage.getItem('another-app-key'),
      caches: await caches.keys(),
    }));
    assert.equal(after.progress, savedProgress);
    assert.equal(after.other, 'Keep this');
    assert(after.caches.includes('another-application-cache'));
    assert(!after.caches.some((name) => name.startsWith('jom-matematik-ppki:%2Fjom-matematik-ppki%2F:')));
    await recoveryPage.getByRole('link', { name: 'Buka Aplikasi Semula' }).click();
    await recoveryPage.getByRole('heading', { name: /7 Modul Kurikulum/ }).waitFor();
    await recoveryContext.close();
    console.info('[Browser] Recovery preserved student progress and unrelated application data.');
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await verifyBrowserOutput();
}