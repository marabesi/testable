import tddContent from './rocket02-guide-content';
import Rocket from '../../components/rocket/Rocket';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';
import {SOURCE_CODE} from '../../constants/editor';

const code = `function dividirGps(a, b) {
  return a / b
}`;

const test = `function testeDividirGpsEmDuasPartes() {
}`;

export default Rocket(
  null,
  code,
  test,
  tddContent,
  '/rocket-03',
  3,
  3,
  'rocket-02',
  SumBehavior,
  SOURCE_CODE,
  null,
  null
);
