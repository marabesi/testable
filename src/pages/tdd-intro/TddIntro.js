import tddContent from './guide-content';
import introContent from './tdd-intro-content';
import Rocket from '../../components/rocket/Rocket';
import {SumBehavior} from '../../engine/strategies/behavior/SumBehavior';

const code = `function subtrair(a, b) {
  return a - b
}`;

const test = `function testeSubtrairNumerosPositivos() {
  var total = subtrair(2, 1)
  var esperado = 1;
  return total === esperado;
}`;

export default Rocket(
  null,
  code,
  test,
  tddContent,
  '/tdd',
  999,
  999,
  'tdd-intro',
  SumBehavior,
  null,
  introContent,
  1
);


