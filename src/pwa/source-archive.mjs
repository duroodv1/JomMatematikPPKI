import JSZip from 'jszip';

export const SOURCE_ZIP_NAME = 'JomMatematikPPKI-GitHub.zip';
export const SOURCE_ROOT = 'JomMatematikPPKI-PWA';
export const REQUIRED_SOURCE_FILES = [
  'README.md', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts',
  'postcss.config.mjs', 'index.html',
  'PANDUAN-GITHUB.md', '.github/workflows/deploy-pages.yml',
  'src/App.tsx', 'src/main.tsx', 'src/index.css', 'src/vite-env.d.ts',
  'src/components/ApplicationBoundary.tsx', 'src/components/InstallBanner.tsx', 'src/utils/saved-state.ts',
  'src/data/moduleQuizzes.ts', 'src/context/AppContext.tsx',
  'src/pwa/client.ts', 'src/pwa/source-bundle.ts', 'src/pwa/source-archive.mjs',
  'src/pwa/source-archive.d.mts', 'src/views/PwaSourceModal.tsx', 'src/components/SourceDownload.tsx',
  'src/components/GitHubGuide.tsx',
  'scripts/prepare-pwa.mjs', 'scripts/prepare-pwa.d.mts', 'tests/sw-checks.mjs', 'tests/sw.test.mjs',
  'tests/github-pages-check.d.mts', 'tests/browser-check.d.mts',
  'tests/source-checks.mjs', 'tests/source.test.mjs', 'tests/source-bundle-check.mjs',
  'tests/github-checks.mjs', 'tests/github-pages-check.mjs',
  'tests/browser-check.mjs',
  'public/sw.js', 'public/manifest.webmanifest', 'public/pwa-version.js', 'public/_headers',
  'public/recovery.html',
  'public/.nojekyll',
  'public/icon-app.png', 'public/icons/icon-192.png', 'public/icons/icon-512.png',
  'public/icons/icon-maskable-512.png', 'public/icons/apple-touch-icon.png',
  'licenses/fredoka-OFL.txt', 'licenses/nunito-OFL.txt',
];

function safePath(name) {
  return typeof name === 'string' && name.length > 0 &&
    !name.startsWith('/') && !name.includes('\\') && !name.includes(':') &&
    !name.split('/').some((part) => !part || part === '.' || part === '..' ||
      ['node_modules', 'dist', '.git'].includes(part) || part.startsWith('.env')) &&
    !name.startsWith('public/downloads/') && !name.endsWith('.zip');
}

function asBytes(data) {
  return typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
}

function sameBytes(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export async function verifySourceArchive(data, expectedEntries) {
  const bytes = asBytes(data);
  if (bytes.length < 22 || bytes[0] !== 80 || bytes[1] !== 75 || bytes[2] !== 3 || bytes[3] !== 4) {
    throw new Error('Fail ini bukan arkib ZIP yang sah. Fail HTML tidak boleh disimpan sebagai ZIP.');
  }

  let archive;
  try {
    archive = await JSZip.loadAsync(bytes, { checkCRC32: true, createFolders: false });
  } catch {
    throw new Error('Arkib ZIP rosak atau tidak lengkap. Sila sediakan ZIP baharu.');
  }
  const paths = [];
  for (const entry of Object.values(archive.files)) {
    if (entry.dir) continue;
    const relative = entry.name.slice(SOURCE_ROOT.length + 1);
    if (!entry.name.startsWith(`${SOURCE_ROOT}/`) || !safePath(relative) ||
        (entry.unsafeOriginalName && entry.unsafeOriginalName !== entry.name)) {
      throw new Error('Arkib mengandungi laluan fail yang tidak dibenarkan.');
    }
    paths.push(relative);
  }
  for (const name of REQUIRED_SOURCE_FILES) {
    if (!archive.file(`${SOURCE_ROOT}/${name}`)) throw new Error(`Kod sumber tidak lengkap: ${name}`);
  }

  const read = (name) => archive.file(`${SOURCE_ROOT}/${name}`).async('uint8array');
  const manifest = JSON.parse(new TextDecoder().decode(await read('public/manifest.webmanifest')));
  if (!Array.isArray(manifest.icons) || manifest.icons.length < 2) throw new Error('Manifest PWA tidak lengkap.');
  for (const icon of manifest.icons) {
    const iconPath = `public/${icon.src.replace(/^\.\//, '')}`;
    if (!safePath(iconPath) || !archive.file(`${SOURCE_ROOT}/${iconPath}`)) throw new Error('Ikon PWA tidak ditemui.');
    const png = await read(iconPath);
    if (png.length < 33 || !sameBytes(png.slice(0, 8), new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]))) {
      throw new Error('Ikon PWA bukan fail PNG yang sah.');
    }
    const dimensions = new DataView(png.buffer, png.byteOffset, png.byteLength);
    if (`${dimensions.getUint32(16)}x${dimensions.getUint32(20)}` !== icon.sizes) {
      throw new Error('Saiz ikon tidak sepadan dengan manifest PWA.');
    }
  }

  // CRC32 detects damaged ZIP data; this also detects missing or changed source files.
  if (expectedEntries) {
    if (paths.length !== expectedEntries.length) throw new Error('Bilangan fail ZIP tidak sepadan.');
    for (const entry of expectedEntries) {
      if (!paths.includes(entry.path) || !sameBytes(await read(entry.path), asBytes(entry.content))) {
        throw new Error(`Semakan kandungan gagal: ${entry.path}`);
      }
    }
  }
  return { fileCount: paths.length, files: paths.sort(), size: bytes.length };
}

export async function createSourceArchive(entries, onProgress = () => {}) {
  const names = new Set();
  const zip = new JSZip();
  for (const entry of [...entries].sort((left, right) => left.path.localeCompare(right.path))) {
    if (!safePath(entry.path) || names.has(entry.path)) throw new Error(`Laluan fail tidak sah atau berulang: ${entry.path}`);
    names.add(entry.path);
    zip.file(`${SOURCE_ROOT}/${entry.path}`, entry.content, {
      date: new Date('2000-01-01T00:00:00Z'),
      createFolders: false,
      binary: typeof entry.content !== 'string',
    });
  }
  // No streaming descriptors or ZIP64: compatible with standard Windows ZIP extraction.
  const data = await zip.generateAsync({
    type: 'uint8array',
    platform: 'DOS',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
    streamFiles: false,
  }, ({ percent }) => onProgress(Math.round(percent * 0.85)));
  onProgress(90);
  const verified = await verifySourceArchive(data, entries);
  onProgress(100);
  return { ...verified, bytes: data };
}
