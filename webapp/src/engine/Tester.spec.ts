import { executeTestCase } from './Tester';
import Reason from './Reason';
import { Sum } from './strategies/behavior/Sum';
import { testCase } from './strategies/tester/Sum';

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

  test('code invoking undefined function should be false', () => {
    const code = `
    function sum(a, b) {
        return a + b
    }
    `;

    const strategy = {
      name: 'func_do_not_exists',
      params: '1,233,44'
    };

    const result = executeTestCase(code, strategy, testCase);

    expect(result).toBeFalsy();
  });

  test('should execute test case to every function in the source code given', () => {
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