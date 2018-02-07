const request = require('request');

function convertBTC(currency = 'BRL', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  request(url, (error, response, body) => {
    const apiResponse = JSON.parse(body);
    console.log(`${amount} NTC = ${apiResponse.price} ${currency}`);
  });
}

module.exports =  convertBTC;
