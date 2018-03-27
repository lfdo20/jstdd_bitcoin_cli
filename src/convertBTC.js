const chalk = require('chalk');
const request = require('request');
const ora = require('ora');

const spinner = ora({
  text: 'Loading bitcoin data...',
  color: 'yellow',
});

function convertBTC(cripto, currency, amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=${cripto}&to=${currency}&amount=${amount}`;

  spinner.start();

  request(url, (error, response, body) => {
    let apiResponse;
    spinner.stop();

    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong with API, try again in a few minutes.'));
      return parseError;
    }
    console.log(`${chalk.green(amount)} ${chalk.cyan(cripto)} = ${chalk.yellow(apiResponse.price)} ${chalk.yellow(currency)}`);
  });
}

module.exports = convertBTC;
