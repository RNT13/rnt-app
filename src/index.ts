#!/usr/bin/env node

import runOptions from '../src/options';
import runSetup from '../src/setup';

(async () => {
  await runSetup();
  await runOptions();
})();
