import Reason from '../Reason';
import { Sum, testCase } from './Sum';

const invalidSumExamples = [
  'var a = 1;',
  'var b = 1;',
  '',
  'auhsuashuasas',
  'function a() {}',
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
      expect(testCase().length).toEqual(2);
    });
  });
});
