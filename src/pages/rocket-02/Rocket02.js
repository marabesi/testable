import tddContent from './rocket02-guide-content';
import Rocket from '../../components/rocket/Rocket';
import {SOURCE_CODE} from '../../constants/editor';
import { testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';

const code = `function dividirGps(a, b) {
  return a / b
}`;

const test = `function testeDividirGpsEmDuasPartes() {
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
  'rocket-02',
  testCaseBehavior,
  SOURCE_CODE,
  null,
  null
);
