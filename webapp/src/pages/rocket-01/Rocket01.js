import tddContent from './rocket01-guide-content';
import Rocket from '../../components/rocket/Rocket';
import {SOURCE_CODE, TEST_CODE} from '../../constants/editor';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';
import { MultiplicationBehavior } from '../../engine/strategies/behavior/MultiplicationBehavior';
import { testCase as sourceTestCase } from '../../engine/strategies/tester/MultiplicationTester';

const code = `function multiplicarMotor(a, b) {
  return a * b
}`;

const test = `function testDeveMultiplicarMotor() {
}`;

export default Rocket(
  null,
  code,
  test,
  testCase,
  sourceTestCase,
  tddContent,
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
