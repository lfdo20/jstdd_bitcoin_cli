const chalk = require('chalk');
const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require('../src/convertBTC');

describe('convertBTC', () => {
  // https://apiv2.bitcoinaverage.com/convert/global?from={source_cur}&to={target_cur}&amount={amount}

  const responseMock = {
    "success": true,
    "time": "2018-02-07 18:53:05",
    "price": 27144.48,
  };

  let consoleStub;

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should return the default conversion of 1 BTC to BRL', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.green(1)} ${chalk.cyan('BTC')} = ${chalk.yellow(27144.48)} ${chalk.yellow('BRL')}`);
      done();
    }, 300);
  });

  it('should return the conversion of 5 BTC to BRL', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 5 })
      .reply(200, responseMock);

    convertBTC('BTC', 'BRL', 5);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`
    ${chalk.green(5)} ${chalk.cyan('BTC')} = ${chalk.yellow(27144.48)} ${chalk.yellow('BRL')}
`);
      done();
    }, 300);
  });

  it('should return the conversion using USD and 1 as default', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    convertBTC('BTC', 'USD', 1);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`
    ${chalk.green(1)} ${chalk.cyan('BTC')} = ${chalk.yellow(27144.48)} ${chalk.yellow('USD')}
`);
      done();
    }, 300);
  });

  it('Should message user when api message with error', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error');

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong with API, try again in a few minutes.'));
      done();
    }, 300);
  });
});
