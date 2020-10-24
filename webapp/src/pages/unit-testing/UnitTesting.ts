//@ts-nocheck
import guideContent from './guide-content';
import Rocket from '../../components/rocket/Rocket';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';
import { Sum } from '../../engine/strategies/behavior/Sum';
import { testCase as sumTestCase } from '../../engine/strategies/tester/Sum';
import {TEST_CODE} from '../../constants/editor';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
}`;

export default Rocket(
  code,
  test,
  testCase,
  sumTestCase,
  guideContent,
  '/unit-testing-end',
  1,
  1,
  'unit-testing',
  testCaseBehavior,
  Sum,
  0,
  null,
  null,
  null,
  [TEST_CODE]
);
