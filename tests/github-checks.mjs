import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const root = fileURLToPath(new URL('../', import.meta.url));

export async function verifyGitHubSource() {
  const document = parseDocument(await readFile(`${root}/.github/workflows/deploy-pages.yml`, 'utf8'));
  assert.equal(document.errors.length, 0, 'GitHub workflow must be valid YAML');
  const workflow = document.toJS();
  assert.deepEqual(workflow.on.push.branches, ['main']);
  assert('workflow_dispatch' in workflow.on, 'A manual retry is required after enabling Pages');
  assert.equal(workflow.permissions.contents, 'read');
  assert.equal(workflow.jobs.build.permissions.pages, 'read');
  assert.equal(workflow.jobs.build.permissions.contents, 'read');
  assert.equal(workflow.jobs.deploy.needs, 'build');
  assert.equal(workflow.jobs.deploy.permissions.pages, 'write');
  assert.equal(workflow.jobs.deploy.permissions['id-token'], 'write');
  assert.equal(workflow.jobs.deploy.environment.name, 'github-pages');
  assert.equal(workflow.jobs.deploy.environment.url, '${{ steps.deployment.outputs.page_url }}');
  assert.equal(workflow.concurrency['cancel-in-progress'], false);

  const steps = workflow.jobs.build.steps;
  const setupNode = steps.find((step) => step.uses?.startsWith('actions/setup-node@'));
  // A browser upload to github.com omits dotfiles, so the workflow must not read one.
  assert.equal(setupNode.with['node-version'], '22');
  assert(!('node-version-file' in setupNode.with), 'Workflow must not depend on a hidden .nvmrc file');
  const install = steps.findIndex((step) => step.run?.startsWith('npm ci'));
  // A lock file that drifts out of sync must not stop a school from publishing.
  assert.match(steps[install].run, /\|\|\s*npm install/);
  const build = steps.findIndex((step) => step.run === 'npm run build');
  const upload = steps.findIndex((step) => step.uses?.startsWith('actions/upload-pages-artifact@'));
  assert(install >= 0 && install < build && build < upload);
  assert.equal(steps[upload].with.path, 'dist');
  // upload-pages-artifact v4 and newer drop dotfiles unless this is enabled, which
  // would silently remove .nojekyll from the published site.
  assert.equal(steps[upload].with['include-hidden-files'], true);
  const workflowText = JSON.stringify(workflow.jobs);
  for (const hidden of ['.nvmrc', '.gitattributes', '.gitignore', 'public/.nojekyll']) {
    assert(!workflowText.includes(hidden), `Workflow must not require the hidden file ${hidden}`);
  }
  assert(workflow.jobs.deploy.steps.some((step) => step.id === 'deployment' && step.uses === 'actions/deploy-pages@v5'));

  // Actions running on Node 20 emit deprecation warnings on GitHub runners.
  const minimumActionVersions = {
    'actions/checkout': 5,
    'actions/setup-node': 5,
    'actions/configure-pages': 6,
    'actions/upload-pages-artifact': 5,
    'actions/deploy-pages': 5,
  };
  const usedActions = [...workflowText.matchAll(/(actions\/[a-z-]+)@v(\d+)/g)];
  assert(usedActions.length >= 5, 'Every published step should use a pinned action version');
  for (const [, action, version] of usedActions) {
    const minimum = minimumActionVersions[action];
    assert(minimum !== undefined, `Unknown action in the workflow: ${action}`);
    assert(Number(version) >= minimum, `${action} must be v${minimum} or newer to avoid the Node 20 deprecation warning`);
  }
  const serialized = JSON.stringify(workflow);
  assert(!serialized.includes('secrets.'), 'No personal token is required');

  const manifest = JSON.parse(await readFile(`${root}/public/manifest.webmanifest`, 'utf8'));
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  assert.equal(manifest.id, './');
  for (const icon of manifest.icons) assert(icon.src.startsWith('./'));
  const navbar = await readFile(`${root}/src/components/Navbar.tsx`, 'utf8');
  const mascots = await readFile(`${root}/src/data/mascots.ts`, 'utf8');
  assert(navbar.includes('src="./icon-app.png"'));
  assert(mascots.includes("image: './icon-app.png'"));
  const index = await readFile(`${root}/index.html`, 'utf8');
  assert(index.includes('href="./manifest.webmanifest"'));
  for (const base of ['https://murid.github.io/', 'https://murid.github.io/jom-matematik-ppki/']) {
    const manifestUrl = new URL('./manifest.webmanifest', base);
    assert.equal(new URL(manifest.start_url, manifestUrl).href, base);
    assert.equal(new URL('./icon-app.png', base).href, `${base}icon-app.png`);
    assert.equal(new URL('./sw.js', base).href, `${base}sw.js`);
  }
  return true;
}