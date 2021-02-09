//@ts-nocheck
import guideContent from './rocket01-guide-content';
import Rocket from '../../components/ui/interface/rocket/Rocket';
import {SOURCE_CODE, TEST_CODE} from '../../components/ui/interface/editor-manager/constants';
import { testCaseBehavior, testCase } from '../../packages/engine/strategies/behavior/TestCaseBehavior';
import { MultiplicationBehavior } from '../../packages/engine/strategies/behavior/MultiplicationBehavior';
import { testCase as sourceTestCase } from '../../packages/engine/strategies/tester/MultiplicationTester';

const code = `function multiplicarMotor(a, b) {
  return a * b
}`;

const test = `function testDeveMultiplicarMotor() {
}`;

export default Rocket(
  code,
  test,
  testCase,
  sourceTestCase,
  guideContent,
  '/rocket-02',
  3,
  3,
  'rocket-01',
  testCaseBehavior,
  MultiplicationBehavior,
  SOURCE_CODE,
  null,
  null,
  null,
  [ TEST_CODE ]
);
