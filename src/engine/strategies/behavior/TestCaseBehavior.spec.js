import { testCaseBehavior } from './TestCaseBehavior';
import Reason from '../../Reason';

describe('testCaseBehavior', () => {

  const code = `
  function somar() {}
  function testeSomarNumerosPositivos() {
    var total = somar(1,2)
    var esperado = 3;
    return total === esperado;
  }`;

  test('extract test case function name', () => {
    const result = Reason(code, testCaseBehavior);
    const testCaseName = 'testeSomarNumerosPositivos';

    expect(result.name).toEqual(testCaseName);
  });

  test('extract function under test name', () => {
    const result = Reason(code, testCaseBehavior);
    const testCaseName = 'somar';

    expect(result.funcUnderTestName).toEqual(testCaseName);
  });

  test('extract function under test parameters', () => {
    const result = Reason(code, testCaseBehavior);
    const testCaseParams = [
      '1',
      '2'
    ];

    expect(result.funcUnderTestParams).toEqual(testCaseParams);
  });

  test('should not allow return statement comparison with the same variable', () => {
    const code = `
    function testeSomarNumerosPositivos() {
      var total = somar(1,2)
      var esperado = 3;
      return total === total;
    }`;

    const result = Reason(code, testCaseBehavior);

    expect(result).toBeUndefined();
  });

  test.each([
    ['var b = 1;', 'incompleted code'],
    ['', 'empty code'],
    ['function test() { }', 'incompleted function'],
    ['function test() { return }', 'incompleted function'],
    ['function test() { var esperado = 1111; var total = 111; return total === total; }', 'expected is not invoking a function to test'],
    ['function test() { var esperado = funcToTest(); var total = 111; return total === total; }', 'return statement against the same varible'],
    ['function test() { var esperado = funcToTest(); var total = 111; return esperado == total; }', 'return statement with double == instead of ==='],
  ])(
    'should be undefined if the code does not look like a test function (%s : %s)',
    (code) => {
      const result = Reason(code, testCaseBehavior);

      expect(result).toBeUndefined();
    }
  );
});