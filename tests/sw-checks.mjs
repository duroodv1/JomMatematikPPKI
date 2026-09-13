import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const workerSource = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');

async function harness(scope = 'https://example.test/', options = {}) {
  const handlers = new Map();
  const stores = new Map();
  const keyOf = (request) => typeof request === 'string' ? request : request.url;
  let online = true;
  let missingAsset = '';
  let rawSource = false;
  let skipped = 0;
  let claimed = 0;
  const self = {
    location: { href: new URL('sw.js', scope).href },
    registration: { scope },
    clients: { claim: async () => { claimed += 1; } },
    skipWaiting: async () => { skipped += 1; },
    addEventListener: (type, handler) => handlers.set(type, handler),
  };
  const caches = {
    keys: async () => [...stores.keys()],
    delete: async (name) => stores.delete(name),
    open: async (name) => {
      if (!stores.has(name)) stores.set(name, new Map());
      const entries = stores.get(name);
      return {
        match: async (request) => entries.get(keyOf(request))?.clone(),
        put: async (request, response) => entries.set(keyOf(request), response.clone()),
      };
    },
  };
  const network = async (request) => {
    if (!online) throw new TypeError('Offline');
    const url = keyOf(request);
    if (rawSource && url.endsWith('index.html')) {
      return new Response('<html><script type="module" src="./src/main.tsx"></script></html>', { headers: { 'Content-Type': 'text/html' } });
    }
    if (url.endsWith('index.html') || (missingAsset && url.endsWith(missingAsset))) {
      return new Response('<!doctype html><html lang="ms-MY">Jom Matematik</html>', { headers: { 'Content-Type': 'text/html' } });
    }
    if (url.endsWith('.zip')) return new Response(new Uint8Array([80, 75, 3, 4]), { headers: { 'Content-Type': 'application/zip' } });
    return new Response('asset', { headers: { 'Content-Type': url.endsWith('.png') ? 'image/png' : 'application/javascript' } });
  };
  vm.runInNewContext(workerSource, {
    self, URL, Request, Response, caches, fetch: network,
    importScripts: (url) => {
      assert.equal(url, new URL('pwa-version.js', scope).href);
      if (options.versionScriptMissing) throw new Error('Failed to load pwa-version.js');
      self.__JOM_PWA_VERSION__ = 'test-version';
    },
  });
  return {
    scope, stores, self,
    get skipped() { return skipped; },
    get claimed() { return claimed; },
    offline: () => { online = false; },
    missing: (name) => { missingAsset = name; },
    serveRawSource: () => { rawSource = true; },
    dispatch: async (type, extra = {}) => {
      const tasks = [];
      handlers.get(type)({ ...extra, waitUntil: (task) => tasks.push(task) });
      await Promise.all(tasks);
    },
    request: async (pathname, mode = 'navigate', method = 'GET') => {
      let response;
      handlers.get('fetch')({
        request: { url: new URL(pathname, scope).href, mode, method },
        respondWith: (result) => { response = result; },
      });
      return response;
    },
  };
}

export const serviceWorkerChecks = [
  ['precache includes the app and icons without requiring the optional ZIP', async () => {
    const app = await harness();
    await app.dispatch('install');
    const entries = [...app.stores.values()][0];
    assert.equal(entries.size, 8);
    assert(!entries.has('https://example.test/downloads/JomMatematikPPKI-PWA-Source.zip'));
    assert(entries.has('https://example.test/icons/icon-512.png'));
    assert.equal(app.skipped, 0);
  }],
  ['cached navigation works offline without a separate ZIP request', async () => {
    const app = await harness();
    await app.dispatch('install');
    app.offline();
    const page = await app.request('./?source=pwa');
    assert.match(await page.text(), /Jom Matematik/);
    assert.equal(await app.request('downloads/JomMatematikPPKI-PWA-Source.zip'), undefined);
  }],
  ['missing images are not replaced by HTML', async () => {
    const app = await harness();
    await app.dispatch('install');
    [...app.stores.values()][0].delete('https://example.test/icons/icon-192.png');
    app.offline();
    const response = await app.request('icons/icon-192.png', 'no-cors');
    assert.equal(response.type, 'error');
  }],
  ['activation preserves unrelated caches and other app scopes', async () => {
    const app = await harness();
    await app.dispatch('install');
    app.stores.set('unrelated-app-cache', new Map());
    app.stores.set('jom-matematik-ppki:%2Fother%2F:previous', new Map());
    app.stores.set('jom-matematik-ppki:%2F:previous', new Map());
    await app.dispatch('activate');
    assert(app.stores.has('unrelated-app-cache'));
    assert(app.stores.has('jom-matematik-ppki:%2Fother%2F:previous'));
    assert(!app.stores.has('jom-matematik-ppki:%2F:previous'));
    assert.equal(app.claimed, 1);
  }],
  ['updates activate only on an explicit message', async () => {
    const app = await harness();
    await app.dispatch('install');
    assert.equal(app.skipped, 0);
    await app.dispatch('message', { data: { type: 'ACTIVATE_UPDATE' } });
    assert.equal(app.skipped, 1);
  }],
  ['offline readiness checks every required cached asset', async () => {
    const app = await harness();
    await app.dispatch('install');
    let reply;
    const message = { data: { type: 'CHECK_OFFLINE' }, ports: [{ postMessage: (data) => { reply = data; } }] };
    await app.dispatch('message', message);
    assert.equal(reply.ready, true);
    assert.equal(reply.revision, 'test-version');
    [...app.stores.values()][0].delete('https://example.test/index.html');
    await app.dispatch('message', message);
    assert.equal(reply.ready, false);
  }],
  ['missing precache assets reject installation instead of caching a fallback page', async () => {
    const app = await harness();
    app.missing('icons/icon-512.png');
    await assert.rejects(app.dispatch('install'), /Fail aset tiada/);
    assert.equal(app.stores.size, 0);
  }],
  ['external requests, POST requests and unknown files are left to the browser', async () => {
    const app = await harness();
    assert.equal(await app.request('https://other.test/', 'navigate'), undefined);
    assert.equal(await app.request('./', 'navigate', 'POST'), undefined);
    assert.equal(await app.request('not-an-app-file.zip'), undefined);
  }],
  ['precache and navigation resolve relative to the registered scope', async () => {
    const app = await harness('https://example.test/learning/');
    await app.dispatch('install');
    const entries = [...app.stores.values()][0];
    assert(entries.has('https://example.test/learning/index.html'));
    assert(!entries.has('https://example.test/index.html'));
    app.offline();
    assert.match(await (await app.request('./')).text(), /Jom Matematik/);
    assert.equal(await app.request('/'), undefined);
  }],
  ['a missing optional source ZIP cannot prevent the app from installing', async () => {
    const app = await harness();
    app.missing('JomMatematikPPKI-PWA-Source.zip');
    await app.dispatch('install');
    assert.equal([...app.stores.values()][0].size, 8);
  }],
  ['old cached HTML disguised as a ZIP is never returned from the source route', async () => {
    const app = await harness();
    await app.dispatch('install');
    [...app.stores.values()][0].set('https://example.test/downloads/JomMatematikPPKI-PWA-Source.zip', new Response('<html>Old fallback</html>'));
    assert.equal(await app.request('downloads/JomMatematikPPKI-PWA-Source.zip'), undefined);
    assert.equal(await app.request('downloads/JomMatematikPPKI-PWA-Source-v2.zip'), undefined);
  }],
  ['raw TypeScript deployment is never stored as the offline application', async () => {
    const app = await harness();
    app.serveRawSource();
    await assert.rejects(app.dispatch('install'), /Kod sumber belum dibina/);
    assert.equal(app.stores.size, 0);
  }],
  ['a missing generated version file does not stop the worker from installing', async () => {
    const app = await harness('https://example.test/', { versionScriptMissing: true });
    await app.dispatch('install');
    const caches = [...app.stores.keys()];
    assert.equal(caches.length, 1);
    assert.match(caches[0], /:unversioned$/);
    assert.equal([...app.stores.values()][0].size, 8);
  }],
];

export async function runServiceWorkerChecks() {
  for (const [, check] of serviceWorkerChecks) await check();
  return serviceWorkerChecks.length;
}