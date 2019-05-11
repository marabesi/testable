import Reason from '../engine/Reason';
import sinon from 'sinon';

describe('Reason', () => {

  test('should execute strategy on Program type only', () => {
    const strategy = sinon.spy();

    Reason('const a = 12;', strategy);
    expect(strategy.called).toBeTruthy();
  });
});
