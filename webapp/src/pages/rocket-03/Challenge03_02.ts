//@ts-nocheck
import content from './challenge03-02-guide-content';
import Rocket from '../../components/ui/interface/rocket/Rocket';
import { DEFAULT_EDITORS_OPTION, SOURCE_CODE, TEST_CODE } from '../../components/ui/interface/editor-manager/constants';
import { testCaseBehavior, testCase } from '../../packages/engine/strategies/behavior/TestCaseBehavior';
import { DivisionByZeroBehavior } from '../../packages/engine/strategies/behavior/DivisionBehavior';
import { testCaseDivisionByZero } from '../../packages/engine/strategies/tester/TestDivisionTester';

const code = `function dividirGps(a, b) {
  return a / b
}`;

const test = `function testeNaoAceitarDivisaoPorZero() {
}`;

export default Rocket(
  code,
  test,
  testCase,
  testCaseDivisionByZero,
  content,
  '/rocket-03',
  3,
  3,
  'rocket-03-02',
  testCaseBehavior,
  DivisionByZeroBehavior,
  null,
  null,
  null,
  DEFAULT_EDITORS_OPTION,
  [
    SOURCE_CODE,
    TEST_CODE
  ],
);
