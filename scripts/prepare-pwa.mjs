import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { createSourceArchive, SOURCE_ZIP_NAME } from '../src/pwa/source-archive.mjs';

// Image processing is only needed when icons are missing, so it stays optional.
const sharp = await import('sharp').then((module) => module.default).catch(() => null);

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function readPngSize(buffer) {
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceExtensions = /\.([cm]?[jt]sx?|css|json|md|html)$/;
let running;
let verificationScheduled = false;

// Uploading through github.com silently omits dot-directories and dotfiles.
// The site must still build, so these small files are restored instead of failing.
const RESTORABLE_FILES = {
  '.nvmrc': '22\n',
  '.gitattributes': '* text=auto eol=lf\n*.png binary\n*.jpg binary\n*.jpeg binary\n*.woff2 binary\n*.zip binary\n',
  '.gitignore': 'node_modules/\ndist/\n.DS_Store\n.env\n.env.*\n*.local\npublic/downloads/\npublic/pwa-version.js\n',
  'public/.nojekyll': '\n',
};

async function writeIfChanged(relativePath, content) {
  const target = path.join(root, relativePath);
  const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
  try {
    if ((await readFile(target)).equals(buffer)) return;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, buffer);
}

async function readOrRestore(relativePath) {
  try {
    return await readFile(path.join(root, relativePath));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const fallback = RESTORABLE_FILES[relativePath];
    if (fallback === undefined) throw new Error(`Fail projek yang diperlukan tiada: ${relativePath}`);
    console.warn(`[GitHub] ${relativePath} tiada dalam repositori. Fail dijana semula untuk binaan ini.`);
    await writeIfChanged(relativePath, fallback);
    return Buffer.from(fallback);
  }
}

async function optionalModule(specifier) {
  try {
    return await import(specifier);
  } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
    console.warn(`[PWA] Fail ujian ${specifier} tiada. Semakan berkenaan dilangkau.`);
    return null;
  }
}

async function collectSources(directory, files) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    if (entry.name.startsWith('.')) return;
    const relativePath = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await collectSources(relativePath, files);
    else if (entry.isFile() && sourceExtensions.test(entry.name)) {
      files.set(relativePath, await readFile(path.join(root, relativePath)));
    }
  }));
}

async function prepare() {
  const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const program = ts.createProgram(parsed.fileNames, { ...parsed.options, noEmit: true });
  const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
  if (diagnostics.length) {
    throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }));
  }
  console.info('[PWA] TypeScript source check passed.');
  const workerChecks = await optionalModule('../tests/sw-checks.mjs');
  if (workerChecks) console.info(`[PWA] ${await workerChecks.runServiceWorkerChecks()} service worker checks passed.`);
  const archiveChecks = await optionalModule('../tests/source-checks.mjs');
  if (archiveChecks) console.info(`[PWA] ${await archiveChecks.runSourceArchiveChecks()} ZIP integrity checks passed.`);
  const gitHubChecks = await optionalModule('../tests/github-checks.mjs');
  if (gitHubChecks) {
    await gitHubChecks.verifyGitHubSource();
    console.info('[GitHub] Workflow YAML, deployment permissions and repository paths verified.');
  }
  if (await optionalModule('../tests/source-bundle-check.mjs')) {
    const sourceCheck = await promisify(execFile)(process.execPath, ['tests/source-bundle-check.mjs'], { cwd: root, timeout: 60_000 });
    console.info(sourceCheck.stdout.trim());
  }
  const files = new Map();
  const originalIcon = await readFile(path.join(root, 'public/icon-app.png'));
  const iconSpecs = [
    ['icon-192.png', 192, 0],
    ['icon-512.png', 512, 0],
    ['icon-maskable-512.png', 512, 112],
    ['apple-touch-icon.png', 180, 0],
  ];

  // Reuse icons shipped with the package. Regenerating them is only needed when they are absent.
  await Promise.all(iconSpecs.map(async ([name, size, padding]) => {
    const relativePath = `public/icons/${name}`;
    const existing = await readFile(path.join(root, relativePath)).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    const existingSize = existing && readPngSize(existing);
    if (existingSize && existingSize.width === size && existingSize.height === size) {
      files.set(relativePath, existing);
      return;
    }

    if (!sharp) {
      throw new Error(`Ikon ${relativePath} tiada dan pustaka sharp tidak dipasang. Muat naik semula folder public/icons daripada pakej.`);
    }
    // Decode the image instead of assuming its filename describes its format.
    let image = sharp(originalIcon).rotate().resize(size - padding * 2, size - padding * 2, {
      fit: 'contain',
      background: '#ffffff',
    }).flatten({ background: '#ffffff' });
    if (padding) image = image.extend({ top: padding, bottom: padding, left: padding, right: padding, background: '#ffffff' });
    const buffer = await image.png().toBuffer();
    const created = readPngSize(buffer);
    assert.equal(created?.width, size);
    assert.equal(created?.height, size);
    await writeIfChanged(relativePath, buffer);
    files.set(relativePath, buffer);
  }));

  const rootFiles = [
    'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts',
    'postcss.config.mjs', 'index.html', 'README.md', '.gitignore',
    'PANDUAN-GITHUB.md', '.github/workflows/deploy-pages.yml', '.gitattributes', '.nvmrc',
    'public/.nojekyll',
    'public/manifest.webmanifest', 'public/sw.js', 'public/_headers', 'public/icon-app.png',
    'public/recovery.html',
  ];
  await Promise.all(rootFiles.map(async (name) => {
    files.set(name, await readOrRestore(name));
  }));
  for (const directory of ['src', 'scripts', 'tests']) {
    try {
      await collectSources(directory, files);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      console.warn(`[PWA] Folder ${directory}/ tiada dalam repositori ini.`);
    }
  }
  for (const font of ['fredoka', 'nunito']) {
    files.set(`licenses/${font}-OFL.txt`, await readFile(path.join(root, `node_modules/@fontsource-variable/${font}/LICENSE`)));
  }

  const manifest = JSON.parse(files.get('public/manifest.webmanifest').toString());
  for (const icon of manifest.icons) {
    const iconPath = `public/${icon.src.replace(/^\.\//, '')}`;
    assert(files.has(iconPath), `Ikon tidak ditemui: ${icon.src}`);
    const dimensions = readPngSize(files.get(iconPath));
    assert(dimensions, `Ikon bukan fail PNG yang sah: ${icon.src}`);
    assert.equal(icon.sizes, `${dimensions.width}x${dimensions.height}`);
  }

  const hash = createHash('sha256');
  for (const name of [...files.keys()].sort()) hash.update(name).update('\0').update(files.get(name));
  const revision = hash.digest('hex').slice(0, 16);
  const version = `// Generated from the current project source.\nself.__JOM_PWA_VERSION__ = '${revision}';\n`;
  await writeIfChanged('public/pwa-version.js', version);
  files.set('public/pwa-version.js', Buffer.from(version));

  const verified = await createSourceArchive([...files].map(([filePath, content]) => ({ path: filePath, content })));
  const archive = Buffer.from(verified.bytes);
  await writeIfChanged(`public/downloads/${SOURCE_ZIP_NAME}`, archive);
  // Keep the original filename usable for existing published links.
  await writeIfChanged('public/downloads/JomMatematikPPKI-PWA-Source-v2.zip', archive);
  await writeIfChanged('public/downloads/JomMatematikPPKI-PWA-Source.zip', archive);
  await writeIfChanged('public/downloads/pwa-source.json', `${JSON.stringify({
    name: SOURCE_ZIP_NAME,
    revision,
    fileCount: files.size,
    size: archive.length,
    sha256: createHash('sha256').update(archive).digest('hex'),
    files: [...files.keys()].sort(),
    checks: ['PNG dimensions and format', 'Manifest icon references', 'ZIP CRC32 and complete source contents', 'Corrupt, truncated and HTML download rejection', 'GitHub workflow YAML and required hidden files'],
  }, null, 2)}\n`);
  console.info(`[PWA] ${files.size} source files verified; ZIP ${(archive.length / 1024).toFixed(0)} KB; revision ${revision}.`);
}

// Verification lives here so the Vite config file stays short enough to retype safely.
function scheduleOutputVerification() {
  if (verificationScheduled || process.env.npm_lifecycle_event !== 'build') return;
  verificationScheduled = true;
  // The upload simulation starts a second build, so it must not start itself again.
  const isNested = process.env.JOM_NESTED_BUILD === '1';

  process.once('beforeExit', async () => {
    if (process.exitCode) return;
    try {
      const pagesCheck = await optionalModule('../tests/github-pages-check.mjs');
      if (pagesCheck) await pagesCheck.verifyPagesOutput();
      if (!isNested && (process.platform === 'linux' || process.env.CHROME_EXECUTABLE_PATH)) {
        const browserCheck = await optionalModule('../tests/browser-check.mjs');
        if (browserCheck) await browserCheck.verifyBrowserOutput();
      }
      if (!isNested) {
        const uploadCheck = await optionalModule('../tests/upload-recovery-check.mjs');
        if (uploadCheck) await uploadCheck.verifyUploadRecovery();
      }
    } catch (error) {
      console.error('[GitHub Pages] Output verification failed:', error);
      process.exitCode = 1;
    }
  });
}

export function preparePwaAssets() {
  scheduleOutputVerification();
  if (!running) running = prepare().finally(() => { running = undefined; });
  return running;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await preparePwaAssets();
}