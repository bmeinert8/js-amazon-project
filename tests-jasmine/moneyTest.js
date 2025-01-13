import {formatCurrency} from '../scripts/utils/money.js';

/*describe is a function that takes two arguments: a string and a function that contains the test suite*/
describe('test suite: formatCurrency', () => {
  /*it is a function that takes two arguments: a string and a function that contains the test*/
  it('convert cents into dollars and cents', () => {
    //expect is a function that alloes us to compare the result of the function to the expected value.
    //expect format currency 2095 to equal 20.95
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest zero', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});