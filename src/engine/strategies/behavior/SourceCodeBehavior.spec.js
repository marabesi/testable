import { SourceCodeBehavior } from './SourceCodeBehavior';
import Reason from '../../Reason';

const invalidSourceCodeExample = [
  'var a = 1;',
  'var b = 1;',
  '',
  'auhsuashuasas',
  'function a() {}',
  'function division(a, b, c) { return a / b * c;}',
];

const validSourceCodeExample = [
  'function division(a, b) { return a / b;}',
  'function addition(a, b) { return a + b;}',
  'function minus(a, b) { return a - b;}',
];

describe('Source code behavior strategy', () => {

  test.each(validSourceCodeExample)(
    'should handle mathematical function',
    (code) => {
      const result = Reason(code, SourceCodeBehavior);
      expect(result).toBeTruthy();
    }
  );

  test.each(invalidSourceCodeExample)(
    'test should not handle when it is not a valid mathematical function (%s)',
    (code) => {
      const result = Reason(code, SourceCodeBehavior);
      expect(result).toBeUndefined();
    },
  );
});
