import tddContent from './rocket03-guide-content';
import Rocket from '../../components/rocket/Rocket';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';
import {SOURCE_CODE} from '../../constants/editor';

const code = `function subtrairTravaDoTremDePouso(a, b) {
  return a - b
}`;

const test = `function testeDeveRemoverAtravaDoTremDePouso() {
}`;

export default Rocket(
  null,
  code,
  test,
  tddContent,
  '/rocket-03',
  3,
  3,
  '/completed',
  SumBehavior,
  SOURCE_CODE,
  null,
  null
);
