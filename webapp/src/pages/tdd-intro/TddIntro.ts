import guideContent from './tdd-intro-guide-content';
import introContent from './tdd-intro-content';
import Rocket from '../../components/rocket/Rocket';
import { SOURCE_CODE, TEST_CODE } from '../../components/ui/interface/editor-manager/constants';
import { testCaseBehavior, testCase } from '../../packages/engine/strategies/behavior/TestCaseBehavior';
import { SubtractionBehavior } from '../../packages/engine/strategies/behavior/SubtractionBehavior';
import { testCase as SubTester } from '../../packages/engine/strategies/tester/SubtractionTester';

const code = `function testDeveMultiplicarMotor() {
  var total = multiplicarMotor(2, 1)
  var esperado = 2;
  return total === esperado;
}`;


const test = '';

export default Rocket(
  code,
  test,
  testCase,
  SubTester,
  guideContent,
  '/tdd',
  2,
  999,
  'tdd-intro',
  SubtractionBehavior,
  testCaseBehavior,
  null,
  introContent,
  0,
  {
    [SOURCE_CODE]: {
      readOnly: true
    },
    [TEST_CODE]: {
      readOnly: true
    }
  }
);
