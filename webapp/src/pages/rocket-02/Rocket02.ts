//@ts-nocheck
import guideContent from './rocket02-guide-content';
import Rocket from '../../components/ui/interface/rocket/Rocket';
import {SOURCE_CODE, TEST_CODE} from '../../components/ui/interface/editor-manager/constants';
import { testCaseBehavior, testCase } from '../../packages/engine/strategies/behavior/TestCaseBehavior';
import { SubtractionBehavior } from '../../packages/engine/strategies/behavior/SubtractionBehavior';
import { testCase as SubTester } from '../../packages/engine/strategies/tester/SubtractionTester';

const code = `function subtrairTravaDoTremDePouso(a, b) {
  return a - b
}`;

const test = `function testeDeveRemoverAtravaDoTremDePouso() {
}`;

export default Rocket(
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
