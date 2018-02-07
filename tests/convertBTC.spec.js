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

  it('should return the default conversion to 1 BTC to BRL', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global?')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('1 BTC to BRL = 27144.48');
      done();
    }, 300);
  });

  it('should return the default conversion to 5 BTC to BRL', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global?')
      .query({ from: 'BTC', to: 'BRL', amount: 5 })
      .reply(200, responseMock);

    convertBTC('BRL', 5);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('5 BTC to BRL = 27144.48');
      done();
    }, 300);
  });
});
