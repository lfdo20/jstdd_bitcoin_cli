#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const convertBTC = require('./convertBTC');

program
  .version(pkg.version)
  .description('Convert criptocoin to any currency.')
  .option('-c, --coin [coin]', 'Define the cripto coin code to be converted (Default: BTC)')
  .option('-r, --currency [currency]', 'Define currency to be converted (Default: BRL)')
  .option('-a, --amount [amount]', 'Define value to be converted (Default: 1)')
  .parse(process.argv);


convertBTC((program.coin || 'BTC').toUpperCase(), (program.currency || 'BRL').toUpperCase(), program.amount);
