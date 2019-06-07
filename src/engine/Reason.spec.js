import Reason from '../engine/Reason';
import sinon from 'sinon';

describe('Reason', () => {

  test('should execute strategy on Program type only', () => {
    const strategy = sinon.spy();

    Reason('const a = 12;', strategy);
    expect(strategy.called).toBeTruthy();
  });

  test('should not buble up the error when a invalid source code is provided', () => {
    const strategy = sinon.spy();

    const result = Reason('function', strategy);
    expect(strategy.called).toBeFalsy();
    expect(result).toBeFalsy();
  });
});
