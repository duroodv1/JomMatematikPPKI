import assert from 'node:assert/strict';
import JSZip from 'jszip';
import sharp from 'sharp';
import { createSourceArchive, verifySourceArchive, REQUIRED_SOURCE_FILES, OPTIONAL_SOURCE_FILES, SOURCE_ROOT } from '../src/pwa/source-archive.mjs';

let fixturePromise;
function fixture() {
  if (!fixturePromise) fixturePromise = (async () => {
    const entries = REQUIRED_SOURCE_FILES.map((path) => ({ path, content: `Test source for ${path}` }));
    const put = (path, content) => { entries.find((entry) => entry.path === path).content = content; };
    put('README.md', 'Bahasa Melayu Standard. Teks Unicode: \u00e9 \u2022 \ud83e\udd89');
    put('public/manifest.webmanifest', JSON.stringify({ icons: [
      { src: './icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: './icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ] }));
    for (const size of [192, 512]) {
      put(`public/icons/icon-${size}.png`, await sharp({ create: { width: size, height: size, channels: 4, background: '#18364d' } }).png().toBuffer());
    }
    return entries;
  })();
  return fixturePromise;
}

async function storedArchive(entries) {
  const archive = new JSZip();
  for (const entry of entries) archive.file(`${SOURCE_ROOT}/${entry.path}`, entry.content, { createFolders: false });
  return archive.generateAsync({ type: 'uint8array', compression: 'STORE' });
}

export const sourceArchiveChecks = [
  ['a complete ZIP passes CRC32 and preserves every source byte', async () => {
    const entries = await fixture();
    const result = await createSourceArchive(entries);
    assert.equal(result.fileCount, entries.length);
    assert.equal(result.size, result.bytes.length);
    const verified = await verifySourceArchive(result.bytes, entries);
    assert.equal(verified.fileCount, entries.length);
  }],
  ['HTML from a missing download route is rejected', async () => {
    await assert.rejects(verifySourceArchive(new TextEncoder().encode('<!doctype html><html>This is not a ZIP.</html>')), /bukan arkib ZIP/);
  }],
  ['a ZIP signature alone is not accepted', async () => {
    await assert.rejects(verifySourceArchive(new Uint8Array([80, 75, 3, 4])), /bukan arkib ZIP/);
  }],
  ['a truncated ZIP with a missing central directory is rejected', async () => {
    const archive = await createSourceArchive(await fixture());
    await assert.rejects(verifySourceArchive(archive.bytes.slice(0, -30)), /rosak atau tidak lengkap/);
  }],
  ['CRC32 detects a damaged payload even when the ZIP header is unchanged', async () => {
    const bytes = await storedArchive(await fixture());
    const marker = new TextEncoder().encode('Bahasa Melayu Standard');
    const offset = bytes.findIndex((_, index) => marker.every((value, position) => bytes[index + position] === value));
    assert(offset > 4);
    bytes[offset] ^= 1;
    await assert.rejects(verifySourceArchive(bytes), /rosak atau tidak lengkap/);
  }],
  ['missing application source files cannot be presented as a complete archive', async () => {
    const entries = (await fixture()).filter((entry) => entry.path !== 'src/App.tsx');
    await assert.rejects(verifySourceArchive(await storedArchive(entries)), /Kod sumber tidak lengkap/);
  }],
  ['duplicate, traversal, private and generated archive paths are rejected', async () => {
    const entries = await fixture();
    for (const path of ['../secrets.txt', '/absolute.txt', '.env', 'node_modules/test.js', 'public/downloads/old.zip']) {
      await assert.rejects(createSourceArchive([...entries, { path, content: 'private' }]), /tidak sah/);
    }
    await assert.rejects(createSourceArchive([...entries, entries[0]]), /berulang/);
  }],
  ['unexpected source substitutions fail byte-for-byte verification', async () => {
    const entries = await fixture();
    const changed = entries.map((entry) => entry.path === 'src/App.tsx' ? { ...entry, content: 'Changed content' } : entry);
    const result = await createSourceArchive(changed);
    await assert.rejects(verifySourceArchive(result.bytes, entries), /Semakan kandungan gagal/);
  }],
  ['incorrect PNG dimensions cannot silently enter the source archive', async () => {
    const entries = await fixture();
    const wrongIcon = entries.find((entry) => entry.path === 'public/icons/icon-192.png');
    const changed = entries.map((entry) => entry.path === 'public/icons/icon-512.png' ? { ...entry, content: wrongIcon.content } : entry);
    await assert.rejects(createSourceArchive(changed), /Saiz ikon/);
  }],
  ['GitHub hidden files are preserved and cannot be omitted from the package', async () => {
    const entries = await fixture();
    const report = await createSourceArchive(entries);
    for (const path of ['.github/workflows/deploy-pages.yml', '.nvmrc', '.gitattributes', '.gitignore', 'public/.nojekyll']) {
      assert(report.files.includes(path));
      const incomplete = entries.filter((entry) => entry.path !== path);
      await assert.rejects(verifySourceArchive(await storedArchive(incomplete)), /Kod sumber tidak lengkap/);
    }
  }],
  ['a repository without the optional tests folder is still a valid package', async () => {
    const entries = await fixture();
    assert(OPTIONAL_SOURCE_FILES.every((path) => path.startsWith('tests/')));
    assert(!REQUIRED_SOURCE_FILES.some((path) => path.startsWith('tests/')), 'Tests must never block publishing');
    const withoutTests = entries.filter((entry) => !entry.path.startsWith('tests/'));
    const report = await verifySourceArchive(await storedArchive(withoutTests));
    assert.equal(report.files.filter((path) => path.startsWith('tests/')).length, 0);
  }],
];

export async function runSourceArchiveChecks() {
  for (const [, check] of sourceArchiveChecks) await check();
  return sourceArchiveChecks.length;
}