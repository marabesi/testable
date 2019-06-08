import { SumBehavior } from '../../strategies/behavior/SumBehavior';
import Reason from '../../Reason';

describe('SumBehavior', () => {

  const code = `
  function testeSomarNumerosPositivos() {
    var total = somar(1,2)
    var esperado = 3;
    return total === esperado;
  }`;

  test('parse test case function', () => {
    const result = Reason(code, SumBehavior);
    const testCaseName = 'testeSomarNumerosPositivos';

    expect(result.name).toEqual(testCaseName);
  });

  test.each(['var b = 1;', 'asdasdasda'])(
    'should be undefined if the code is not a function (%s)',
    (code) => {
      const result = Reason(code, SumBehavior);

      expect(result).toBeUndefined();
    }
  );
});