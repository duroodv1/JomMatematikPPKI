import test from 'node:test';
import { serviceWorkerChecks } from './sw-checks.mjs';

for (const [name, check] of serviceWorkerChecks) test(name, check);