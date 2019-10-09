import { Sum } from './Sum';
import  { testCase } from '../tester/Sum';
import Reason from '../../Reason';

const invalidSumExamples = [
  'function minus(a, b) { return a * b;}',
  'function minus(a, b) { return a - b;}',
];

describe('Sum strategy', () => {

  test('should handle sum function', () => {
    const code = 'function sum(a, b) { return a + b }';
    const result = Reason(code, Sum);
    expect(result).toBeTruthy();
  });

  test.each(invalidSumExamples)(
    'test should not handle when it is not a sum function (%s)',
    (code) => {
      const result = Reason(code, Sum);
      expect(result).toBeUndefined();
    },
  );


  describe('sum test case', () => {
    test('should have sum test cases to make sure that the code works as expected', () => {
      expect(testCase.length).toEqual(2);
    });
  });
});
