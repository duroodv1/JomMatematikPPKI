import test from 'node:test';
import { sourceArchiveChecks } from './source-checks.mjs';

for (const [name, check] of sourceArchiveChecks) test(name, check);