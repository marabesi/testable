import tddContent from './rocket01-guide-content';
import Rocket from '../../components/rocket/Rocket';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';
import { SOURCE_CODE } from '../../constants/editor';

const code = `function multiplicarMotor(a, b) {
  return a * b
}`;

const test = `function testDeveMultiplicarMotor() {
}`;

export default Rocket(
  null,
  code,
  test,
  tddContent,
  '/rocket-02',
  3,
  3,
  'rocket-01',
  SumBehavior,
  SOURCE_CODE,
  null,
  null
);
