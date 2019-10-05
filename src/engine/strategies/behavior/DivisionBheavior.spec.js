import { DivisionByZeroBehavior } from './DivisionBehavior';
import Reason from '../../Reason';

describe('division by zero behavior', () => {

  test.each([
    `function randomDivision(a, b) {
      return a / b;
    }`
  ])('should be undefined on invalid code', code => {
    const evaluate = Reason(code, DivisionByZeroBehavior);

    expect(evaluate).toBeUndefined();
  });

  test.each([
    `function randomDivision(a, b) {
      if (a === 0 || b === 0) {
        return false;
      }
      return a / b;
    }`
  ])('should parse valid division by zero function', code => {
    const evaluate = Reason(code, DivisionByZeroBehavior);

    expect(evaluate).toBeTruthy();
  });
});