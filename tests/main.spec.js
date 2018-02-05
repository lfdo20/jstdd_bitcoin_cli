const expect = require('chai').expect;
const exec = require('child_process').exec;
const btcConverter = require('../src/main.js');

describe('Bitcoin Cli', () => {
  it('Should return "OK Hello"', (done) => {
    exec(btcConverter, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal('OK Hello');
      done();
    });
  });
});

