import tddContent from './guide-content';
import introContent from './tdd-intro-content';
import Rocket from '../../components/rocket/Rocket';
import {testCaseBehavior, testCase } from '../../engine/strategies/behavior/TestCaseBehavior';

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
  testCase,
  tddContent,
  '/tdd',
  999,
  999,
  'tdd-intro',
  testCaseBehavior,
  null,
  introContent,
  1
);


