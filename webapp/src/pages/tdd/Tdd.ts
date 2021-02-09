import guideContent from './tdd-guide-content';
import Rocket from '../../components/ui/interface/rocket/Rocket';
import { TEST_CODE } from '../../components/ui/interface/editor-manager/constants';
import { testCaseBehavior, testCase } from '../../packages/engine/strategies/behavior/TestCaseBehavior';
import { SubtractionBehavior } from '../../packages/engine/strategies/behavior/SubtractionBehavior';
import { testCase as SubTester } from '../../packages/engine/strategies/tester/SubtractionTester';

const code = `function testDeveMultiplicarMotor() {
}`;

const test = '';

export default Rocket(
  code,
  test,
  testCase,
  SubTester,
  guideContent,
  '/tdd-end',
  999,
  999,
  'tdd',
  SubtractionBehavior,
  testCaseBehavior,
  null,
  null,
  0,
  {
    [TEST_CODE]: {
      readOnly: true
    }
  }
);
