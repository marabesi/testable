import content from './challenge03-02-guide-content';
import Rocket from '../../components/rocket/Rocket';
import { DEFAULT_EDITORS_OPTION, SOURCE_CODE, TEST_CODE } from '../../constants/editor';
import { testCaseBehavior } from '../../engine/strategies/behavior/TestCaseBehavior';
import { testCaseDivisionByZero } from '../../engine/strategies/tester/TestDivisionTester';

const code = `function dividirGps(a, b) {
  if (a === 0) { return false; }
  return a / b
}`;

const test = `function testeNaoAceitarDivisaoPorZero() {
}`;

export default Rocket(
  null,
  code,
  test,
  testCaseDivisionByZero,
  content,
  '/rocket-03',
  3,
  3,
  'rocket-03-02',
  testCaseBehavior,
  null,
  null,
  null,
  DEFAULT_EDITORS_OPTION,
  [
    SOURCE_CODE,
    TEST_CODE
  ],
);
