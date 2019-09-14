import tddContent from './rocket03-guide-content';
import Rocket from '../../components/rocket/Rocket';
import {SOURCE_CODE, TEST_CODE} from '../../constants/editor';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';

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
  tddContent,
  '/rocket-03',
  3,
  3,
  '/completed',
  testCaseBehavior,
  SOURCE_CODE,
  null,
  null,
  null,
  [ TEST_CODE ]
);
