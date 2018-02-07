#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');

var _require = require('./btcConverter'),
    btcConverter = _require.btcConverter;

program.version(pkg.version).description('Convert bitcoin to any currency.').option('-C, --currency <currency>', 'Define currency to be converted (Default: BRL)').option('-A, --amount <amount>', 'Define value to be converted (Default: 1)').parse(process.argv);

console.log(btcConverter(program.currency, program.amount));