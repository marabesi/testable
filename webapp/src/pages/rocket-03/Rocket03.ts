//@ts-nocheck
import guideContent from './rocket03-guide-content';
import Rocket from '../../components/rocket/Rocket';
import {SOURCE_CODE, TEST_CODE} from '../../constants/editor';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';
import { DivisionBehavior } from '../../engine/strategies/behavior/DivisionBehavior';
import { testCase as testDivisionCase } from '../../engine/strategies/tester/TestDivisionTester';

const code = `function dividirGps(a, b) {
  return a / b
}`;

const test = `function testeDividirGpsEmDuasPartes() {
}`;

export default Rocket(
  code,
  test,
  testCase,
  testDivisionCase,
  guideContent,
  '/completed',
  3,
  3,
  'rocket-03',
  testCaseBehavior,
  DivisionBehavior,
  SOURCE_CODE,
  null,
  null,
  null,
  [ TEST_CODE ]
);
