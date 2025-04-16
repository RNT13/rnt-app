#!/usr/bin/env node


import runSetup from './setup.js';
import runOptions from './options.js';



(async () => {
  await runSetup();
  await runOptions();
})();
