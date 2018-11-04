const expect = require('chai').expect;

describe('my first test', () => {
  it('test my test', () => {
    expect('hello').to.be.an('string');
  });
});
