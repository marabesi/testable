import content from './challenge03-02-guide-content';
import Rocket from '../../components/rocket/Rocket';
import {DEFAULT_EDITORS_OPTION, SOURCE_CODE, TEST_CODE} from '../../constants/editor';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';

const code = `function dividirGps(a, b) {
  return a / b
}`;

const test = `function testeNaoAceitarDivisaoPorZero() {
}`;

export default Rocket(
  null,
  code,
  test,
  testCase,
  content,
  '/rocket-03',
  3,
  2,
  'rocket-02-02',
  testCaseBehavior,
  SOURCE_CODE,
  null,
  null,
  DEFAULT_EDITORS_OPTION,
  [
    SOURCE_CODE,
    TEST_CODE
  ],
);
