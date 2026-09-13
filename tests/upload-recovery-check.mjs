import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, stat, mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const run = promisify(execFile);

// Reproduces a repository created by uploading files through github.com,
// where dot-directories, dotfiles and the tests folder are silently dropped.
const DROPPED_BY_BROWSER_UPLOAD = ['.nvmrc', '.gitattributes', '.gitignore', 'public/.nojekyll', 'tests'];

export async function verifyUploadRecovery() {
  const workspace = await mkdtemp(path.join(tmpdir(), 'jom-upload-'));
  try {
    for (const entry of ['src', 'public', 'scripts', 'tests', 'index.html', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'postcss.config.mjs', 'README.md', 'PANDUAN-GITHUB.md', '.github', '.nvmrc', '.gitattributes', '.gitignore']) {
      await cp(path.join(root, entry), path.join(workspace, entry), { recursive: true });
    }
    await cp(path.join(root, 'node_modules'), path.join(workspace, 'node_modules'), { recursive: true, verbatimSymlinks: true });
    // Generated archives are not committed. Icons are committed so no image library is needed.
    await rm(path.join(workspace, 'public/downloads'), { recursive: true, force: true });

    for (const entry of DROPPED_BY_BROWSER_UPLOAD) {
      await rm(path.join(workspace, entry), { recursive: true, force: true });
    }
    // Heavy image and testing packages may fail to install on a runner.
    // Publishing the site must not depend on them.
    for (const optional of ['sharp', 'yaml', 'playwright-core', '@sparticuz/chromium']) {
      await rm(path.join(workspace, 'node_modules', optional), { recursive: true, force: true });
    }
    // GitHub's own starter workflow is unrelated to this project and must not break the build.
    await mkdir(path.join(workspace, '.github/workflows'), { recursive: true });
    await writeFile(path.join(workspace, '.github/workflows/ci.yml'), 'name: CI\non: push\njobs:\n  noop:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "unrelated"\n');

    // Run the same command GitHub Actions runs, with a clean npm environment so the
    // post-build verification path is exercised exactly as it is on a runner.
    const environment = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('npm_')));
    const result = await run('npm', ['run', 'build'], {
      cwd: workspace,
      timeout: 300_000,
      // JOM_NESTED_BUILD stops this simulated build from starting the checks again.
      env: { ...environment, JOM_NESTED_BUILD: '1' },
    });

    const output = `${result.stdout}\n${result.stderr}`;
    assert.match(output, /\.nvmrc tiada dalam repositori/, 'The build should report and restore the missing Node version file');
    assert.match(output, /Folder tests\/ tiada dalam repositori/, 'A repository without the tests folder should still build');
    const tail = output.slice(-1200);
    assert.match(output, /github-pages-check\.mjs tiada/, `A missing verification file must be skipped, not fatal. Tail: ${tail}`);
    assert(!/Cannot find module/i.test(output), 'A missing tests folder must never abort the build');

    const html = await readFile(path.join(workspace, 'dist/index.html'), 'utf8');
    assert(html.includes('id="root"'), 'The published page must contain the application root');
    // Inspect real script attributes, not source text embedded inside the compiled bundle.
    const scripts = [...html.matchAll(/<script\b([^>]*)>[\s\S]*?<\/script\s*>/gi)];
    assert(!scripts.some((match) => /\bsrc=["'][^"']*src\/main\.tsx/i.test(match[1])), 'Raw TypeScript must never be published');
    for (const required of ['dist/manifest.webmanifest', 'dist/sw.js', 'dist/recovery.html', 'dist/.nojekyll', 'dist/icons/icon-192.png', 'dist/icons/icon-512.png']) {
      assert((await stat(path.join(workspace, required))).isFile(), `${required} must exist for GitHub Pages`);
    }
    console.info('[GitHub] Repository missing hidden files and tests still builds a complete site.');
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await verifyUploadRecovery();
}
