import tddContent from './guide-content';
import Rocket from '../../components/rocket/Rocket';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
}`;

export default Rocket(
  null,
  code,
  test,
  testCase,
  tddContent,
  '/tdd-end',
  1,
  1,
  'tdd',
  testCaseBehavior,
  0,
  null,
  null
);

