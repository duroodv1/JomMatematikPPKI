import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { verifyGitHubSource } from './github-checks.mjs';
import { verifySourceArchive, SOURCE_ZIP_NAME } from '../src/pwa/source-archive.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

export async function verifyPagesOutput(outputDirectory = path.join(root, 'dist')) {
  await verifyGitHubSource();
  const html = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
  assert(html.includes('<html lang="ms-MY">'));
  assert(/<script[^>]*type="module"[^>]*>[\s\S]+?<\/script>/.test(html), 'The application must be compiled, not raw TSX');
  const shell = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  const links = [...shell.matchAll(/<link\b[^>]*href="([^"]+)"/gi)].map((match) => match[1]);
  assert(links.includes('./manifest.webmanifest'));
  for (const link of links) {
    assert(link.startsWith('./'), `Asset path must support the repository subfolder: ${link}`);
    assert((await stat(path.join(outputDirectory, link))).isFile());
  }
  assert((await stat(path.join(outputDirectory, '.nojekyll'))).isFile());
  assert((await stat(path.join(outputDirectory, 'recovery.html'))).isFile());
  assert(shell.includes('id="startup-panel"'), 'An HTML-only fallback must be available when JavaScript fails');
  const scripts = [...html.matchAll(/<script\b([^>]*)>[\s\S]*?<\/script\s*>/gi)];
  assert(!scripts.some((match) => /\bsrc=["'][^"']*src\/main\.tsx/i.test(match[1])), 'Do not deploy raw TypeScript');
  const manifest = JSON.parse(await readFile(path.join(outputDirectory, 'manifest.webmanifest'), 'utf8'));
  for (const icon of manifest.icons) assert((await stat(path.join(outputDirectory, icon.src))).isFile());
  const worker = await readFile(path.join(outputDirectory, 'sw.js'), 'utf8');
  assert(worker.includes('self.registration.scope'));
  const version = await readFile(path.join(outputDirectory, 'pwa-version.js'), 'utf8');
  const metadata = JSON.parse(await readFile(path.join(outputDirectory, 'downloads/pwa-source.json'), 'utf8'));
  assert(version.includes(metadata.revision));
  const archive = await readFile(path.join(outputDirectory, 'downloads', SOURCE_ZIP_NAME));
  const report = await verifySourceArchive(archive);
  assert.equal(report.fileCount, metadata.fileCount);
  assert.equal(archive.length, metadata.size);
  assert.equal(createHash('sha256').update(archive).digest('hex'), metadata.sha256);
  assert(report.files.includes('.github/workflows/deploy-pages.yml'));
  assert(report.files.includes('PANDUAN-GITHUB.md'));
  assert(report.files.includes('.nvmrc'));
  console.info(`[GitHub Pages] dist assets, relative paths and ${report.fileCount}-file GitHub ZIP verified.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await verifyPagesOutput();
}