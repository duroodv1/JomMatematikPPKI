try {
  importScripts(new URL('./pwa-version.js', self.location.href).href);
} catch {
  // A site published without the generated version file must still work offline.
  self.__JOM_PWA_VERSION__ = 'unversioned';
}

const APP_URL = new URL(self.registration.scope);
const PREFIX = `jom-matematik-ppki:${encodeURIComponent(APP_URL.pathname)}:`;
const CACHE_NAME = `${PREFIX}${self.__JOM_PWA_VERSION__}`;
const INDEX_URL = new URL('index.html', APP_URL).href;
const CORE_FILES = [
  'index.html',
  'manifest.webmanifest',
  'pwa-version.js',
  'icon-app.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];
// Source export is embedded in the app. A missing optional ZIP must not block offline lessons.
const CORE_URLS = CORE_FILES.map((file) => new URL(file, APP_URL).href);

async function cacheApp() {
  const cache = await caches.open(CACHE_NAME);
  // Consume each response immediately. Holding every body until all headers arrive can
  // exhaust the browser connection pool when the bundled app and logo are large.
  const results = await Promise.allSettled(CORE_URLS.map(async (url) => {
    const response = await fetch(new Request(url, { cache: 'reload' }));
    if (!response.ok || response.type === 'opaque') throw new Error(`Gagal menyimpan ${url}`);
    const contentType = response.headers.get('content-type') || '';
    if (url === INDEX_URL && !contentType.includes('text/html')) throw new Error('Fail aplikasi tidak sah.');
    if (url === INDEX_URL) {
      // Inspect real script tag attributes, not exported source text inside the compiled script.
      const scripts = [...(await response.clone().text()).matchAll(/<script\b([^>]*)>[\s\S]*?<\/script\s*>/gi)];
      if (scripts.some((match) => /\bsrc=["'][^"']*src\/main\.tsx/i.test(match[1]))) {
        throw new Error('Kod sumber belum dibina. Terbitkan folder dist melalui GitHub Actions.');
      }
    }
    if (url !== INDEX_URL && contentType.includes('text/html')) throw new Error(`Fail aset tiada: ${url}`);
    await cache.put(url, response);
  }));
  const failure = results.find((result) => result.status === 'rejected');
  if (failure) {
    await caches.delete(CACHE_NAME);
    throw failure.reason;
  }
}

self.addEventListener('install', (event) => {
  // A new worker waits for permission, so a running lesson is not interrupted.
  event.waitUntil(cacheApp().catch((error) => {
    console.error('[Jom Matematik] Offline cache installation failed:', error);
    throw error;
  }));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(PREFIX) && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'ACTIVATE_UPDATE') {
    event.waitUntil(self.skipWaiting());
  }
  if (event.data?.type === 'CHECK_OFFLINE') {
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
      const entries = await Promise.all(CORE_URLS.map((url) => cache.match(url)));
      event.ports[0]?.postMessage({ ready: entries.every(Boolean), revision: self.__JOM_PWA_VERSION__ });
    })());
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== APP_URL.origin || !url.pathname.startsWith(APP_URL.pathname)) return;

  const isAppNavigation = request.mode === 'navigate' &&
    (url.pathname === APP_URL.pathname || url.pathname === new URL(INDEX_URL).pathname);

  if (isAppNavigation) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(INDEX_URL);
      if (cached) return cached;
      try {
        return await fetch(request);
      } catch {
        return new Response('Aplikasi belum disimpan. Sambungkan internet dan buka semula aplikasi.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
    })());
    return;
  }

  if (CORE_URLS.includes(url.href)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        return await fetch(request);
      } catch {
        // Missing images and ZIP files must never receive the app HTML as a fallback.
        return Response.error();
      }
    })());
  }
});