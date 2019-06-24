import Reason from '../engine/Reason';
import sinon from 'sinon';

describe('Reason', () => {

  test('should parse var declaration', () => {
    const strategy = sinon.spy();

    Reason('var b = 1;', strategy);
    expect(strategy.called).toBeTruthy();
  });

  test('should execute strategy on Program type only', () => {
    const strategy = sinon.spy();

    Reason('const a = 12;', strategy);
    expect(strategy.called).toBeTruthy();
  });

  test.each([['function']])(
    'should not buble up the error when a invalid source code is provided',
    (code) => {
      const strategy = sinon.spy();

      const result = Reason(code, strategy);
      expect(strategy.called).toBeFalsy();
      expect(result).toBeFalsy();
    }
  );
});
