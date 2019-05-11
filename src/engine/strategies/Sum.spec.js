import Reason from '../Reason';
import Sum from './Sum';

const invalidSumExamples = [
  'var a = 1;',
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
      expect(result).toBeFalsy();
    },
  );

  // test.only('should handle multiple function declaration, and find the sum wherever it is', () => {
  //   const code = 'function minus(a, b) { return a - b;}; function sum(a, b) { return a + b;}';
  //   const result = Reason(code, Sum);
  //   expect(result.name).toEqual('sum');
  // });
});
