import tddContent from './guide-content';
import Rocket from '../../components/rocket/Rocket';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';
import { Sum } from '../../engine/strategies/behavior/Sum';
import { testCase as sumTestCase } from '../../engine/strategies/tester/Sum';

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
  sumTestCase,
  tddContent,
  '/tdd-end',
  1,
  1,
  'tdd',
  testCaseBehavior,
  Sum,
  0,
  null,
  null
);

