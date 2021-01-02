import guideContent from './unit-testing-intro-guide-content';
import introContent from './unit-testing-intro-content';
import Rocket from '../../components/rocket/Rocket';
import {testCaseBehavior, testCase } from '../../packages/engine/strategies/behavior/TestCaseBehavior';
import { SubtractionBehavior } from '../../packages/engine/strategies/behavior/SubtractionBehavior';
import { testCase as subtractionTestCase } from '../../packages/engine/strategies/tester/SubtractionTester';
import {SOURCE_CODE, TEST_CODE} from '../../components/ui/interface/editor-manager/constants';

const code = `function subtrair(a, b) {
  return a - b
}`;

const test = `function testeSubtrairNumerosPositivos() {
  var total = subtrair(2, 1)
  var esperado = 1;
  return total === esperado;
}`;

export default Rocket(
  code,
  test,
  testCase,
  subtractionTestCase,
  guideContent,
  '/unit-testing',
  999,
  999,
  'unit-testing-intro',
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

