import tddContent from './guide-content';
import introContent from './tdd-intro-content';
import Rocket from '../../components/rocket/Rocket';
import {testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';
import { SubtractionBehavior } from '../../engine/strategies/behavior/SubtractionBehavior';
import { testCase as subtractionTestCase } from '../../engine/strategies/tester/SubtractionTester';
import {SOURCE_CODE, TEST_CODE} from '../../constants/editor';

const code = `function subtrair(a, b) {
  return a - b
}`;

const test = `function testeSubtrairNumerosPositivos() {
  var total = subtrair(2, 1)
  var esperado = 1;
  return total === esperado;
}`;

export default Rocket(
  null,
  code,
  test,
  testCase,
  subtractionTestCase,
  tddContent,
  '/tdd',
  999,
  999,
  'tdd-intro',
  testCaseBehavior,
  SubtractionBehavior,
  null,
  introContent,
  1,
  {
    [SOURCE_CODE]: {
      readOnly: true
    },
    [TEST_CODE]: {
      readOnly: true
    }
  }
);

