const expect = require('chai').expect;
const exec = require('child_process').exec;

const btcConverter = './src/main';
const pkg = require('../package.json');

describe('Bitcoin Cli', () => {
  it('Should return version', (done) => {
    exec(`node ${btcConverter} --version`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });

  it('Should return description when --help', (done) => {
    exec(`node ${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('Convert bitcoin to any currency.')).to.be.true;
      done();
    });
  });

  it('Should return currency when --help', (done) => {
    exec(`node ${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--currency')).to.be.true;
      done();
    });
  });

  it('Should return amount when --help', (done) => {
    exec(`node ${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--amount')).to.be.true;
      done();
    });
  });
});

