#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const conertBTC = require('./convertBTC');

program
  .version(pkg.version)
  .description('Convert bitcoin to any currency.')
  .option('-C, --currency <currency>', 'Define currency to be converted (Default: BRL)')
  .option('-A, --amount <amount>', 'Define value to be converted (Default: 1)')
  .parse(process.argv);

// .option('-B, --bitcoin <bitcoin>', 'Define currency to be converted (Default: BTC)')
console.log(convertBTC(program.currency, program.amount));
