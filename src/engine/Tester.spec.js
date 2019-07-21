import { executeTestCase } from './Tester';
import Reason from './Reason';
import { Sum, testCase } from './strategies/Sum';

describe('integration with test cases', () => {
  test('should execute and pass a correct test approach with sum code', () => {
    const code = `
    function sum(a, b) {
        return a + b
    }
    `;

    const strategy = Reason(code, Sum);
    const result = executeTestCase(code, strategy, testCase);

    expect(result).toBeTruthy();
  });
});