import guideContent from './rocket02-guide-content';
import Rocket from '../../components/rocket/Rocket';
import {SOURCE_CODE, TEST_CODE} from '../../constants/editor';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';
import { SubtractionBehavior } from '../../engine/strategies/behavior/SubtractionBehavior';
import { testCase as SubTester } from '../../engine/strategies/tester/SubtractionTester';

const code = `function subtrairTravaDoTremDePouso(a, b) {
  return a - b
}`;

const test = `function testeDeveRemoverAtravaDoTremDePouso() {
}`;

export default Rocket(
  null,
  code,
  test,
  testCase,
  SubTester,
  guideContent,
  '/rocket-03',
  3,
  3,
  'rocket-02',
  testCaseBehavior,
  SubtractionBehavior,
  SOURCE_CODE,
  null,
  null,
  null,
  [ TEST_CODE ]
);
