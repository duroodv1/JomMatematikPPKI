import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';
import { createServer } from 'vite';
import sharp from 'sharp';
import { createSourceArchive, SOURCE_ROOT } from '../src/pwa/source-archive.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({
  root,
  configFile: false,
  logLevel: 'silent',
  css: { postcss: { plugins: [] } },
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  ssr: { noExternal: [/^@fontsource-variable\//] },
});

async function expectedSourcePaths(directory) {
  const entries = await readdir(`${root}/${directory}`, { withFileTypes: true });
  const result = await Promise.all(entries.map((entry) => {
    const relative = `${directory}/${entry.name}`;
    if (entry.isDirectory()) return expectedSourcePaths(relative);
    return /\.([cm]?[jt]sx?|css|json|md|html)$/.test(entry.name) ? [relative] : [];
  }));
  return result.flat();
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Independently parse standard ZIP headers and inflate each file without JSZip.
function verifyIndependentZip(data, entries) {
  const zip = Buffer.from(data);
  const end = zip.length - 22;
  assert.equal(zip.readUInt32LE(end), 0x06054b50);
  assert.equal(zip.readUInt16LE(end + 10), entries.length);
  let offset = zip.readUInt32LE(end + 16);
  for (let i = 0; i < entries.length; i++) {
    assert.equal(zip.readUInt32LE(offset), 0x02014b50);
    const flags = zip.readUInt16LE(offset + 8);
    assert.equal(flags & 9, 0, 'No encryption or streamed data descriptors');
    const method = zip.readUInt16LE(offset + 10);
    const storedCrc = zip.readUInt32LE(offset + 16);
    const compressedSize = zip.readUInt32LE(offset + 20);
    const size = zip.readUInt32LE(offset + 24);
    const nameLength = zip.readUInt16LE(offset + 28);
    const name = zip.subarray(offset + 46, offset + 46 + nameLength).toString('utf8');
    const local = zip.readUInt32LE(offset + 42);
    assert.equal(zip.readUInt32LE(local), 0x04034b50);
    const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
    const compressed = zip.subarray(start, start + compressedSize);
    assert([0, 8].includes(method));
    const bytes = method === 8 ? inflateRawSync(compressed) : compressed;
    const original = entries.find((entry) => `${SOURCE_ROOT}/${entry.path}` === name);
    assert(original, `Unexpected ZIP entry: ${name}`);
    assert.equal(bytes.length, size);
    assert.equal(crc32(bytes), storedCrc);
    assert(bytes.equals(Buffer.from(original.content)));
    offset += 46 + nameLength + zip.readUInt16LE(offset + 30) + zip.readUInt16LE(offset + 32);
  }
  assert.equal(offset, end);
}

try {
  const sourceModule = await server.ssrLoadModule('/src/pwa/source-bundle.ts');
  const entries = sourceModule.getBundledSourceEntries();
  const byName = new Map(entries.map((entry) => [entry.path, entry.content]));
  for (const path of (await Promise.all(['src', 'scripts', 'tests'].map(expectedSourcePaths))).flat()) {
    assert(byName.has(path), `Source bundle omitted ${path}`);
    assert.equal(byName.get(path), await readFile(`${root}/${path}`, 'utf8'));
  }
  for (const path of ['package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'postcss.config.mjs', 'README.md', 'PANDUAN-GITHUB.md', '.gitignore', '.gitattributes', '.nvmrc', '.github/workflows/deploy-pages.yml', 'index.html', 'public/manifest.webmanifest', 'public/sw.js', 'public/_headers', 'public/.nojekyll']) {
    assert.equal(byName.get(path), await readFile(`${root}/${path}`, 'utf8'));
  }
  assert.equal(byName.get('public/recovery.html'), await readFile(`${root}/public/recovery.html`, 'utf8'));
  const logo = await readFile(`${root}/public/icon-app.png`);
  assert(Buffer.from(byName.get('public/icon-app.png')).equals(logo), 'The bundled icon must be real binary bytes, not an asset URL');
  for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['icon-maskable-512.png', 512], ['apple-touch-icon.png', 180]]) {
    entries.push({ path: `public/icons/${name}`, content: await sharp(logo).resize(size, size, { fit: 'contain', background: '#ffffff' }).png().toBuffer() });
  }
  const archive = await createSourceArchive(entries);
  verifyIndependentZip(archive.bytes, entries);
  console.info(`[PWA] Vite source imports verified; ${entries.length} ZIP files independently extracted with zlib.`);
  const { pwaAssetUrl } = await server.ssrLoadModule('/src/pwa/client.ts');
  const { MASCOTS } = await server.ssrLoadModule('/src/data/mascots.ts');
  for (const base of ['https://murid.github.io/', 'https://murid.github.io/jom-matematik-ppki/']) {
    const previousDocument = globalThis.document;
    const previousWindow = globalThis.window;
    try {
      globalThis.document = { querySelector: () => ({ href: new URL('./manifest.webmanifest', base).href }) };
      globalThis.window = { location: { href: base } };
      for (const asset of ['sw.js', './', 'downloads/JomMatematikPPKI-GitHub.zip']) {
        assert.equal(pwaAssetUrl(asset), new URL(asset, base).href);
      }
      for (const mascot of MASCOTS.filter((entry) => entry.image)) {
        assert.equal(new URL(mascot.image, base).href, new URL('icon-app.png', base).href);
      }
    } finally {
      if (previousDocument === undefined) delete globalThis.document;
      else globalThis.document = previousDocument;
      if (previousWindow === undefined) delete globalThis.window;
      else globalThis.window = previousWindow;
    }
  }
  console.info('[GitHub Pages] Runtime asset URLs verified at the domain root and repository subfolder.');
} finally {
  await server.close();
}