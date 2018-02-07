'use strict';

function btcConverter() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return amount + ' BTC = 2000 ' + currency;
}

module.exports = { btcConverter: btcConverter };