#!/usr/bin/env node

import runOptions from '../src/options.js';
import runSetup from '../src/setup.js';

(async () => {
  await runSetup();
  await runOptions();
})();
