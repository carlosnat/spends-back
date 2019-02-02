/* global it, describe */

const {
  expect,
} = require('chai');

describe('my first test', () => {
  it('test my test', () => {
    expect('hello').to.be.an('string');
  });
});
