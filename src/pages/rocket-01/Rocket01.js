import React, { Component } from 'react';
import tddContent from './rocket01-guide-content';
import Rocket from '../../components/rocket/Rocket';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';

const code = `function multiplicarMotor(a, b) {
  return a * b
}`;

const test = `function testDeveMultiplicarMotor() {
}`;

class Rocket01 extends Component {
  render() {
    return (<React.Fragment />);
  }
}

export default Rocket(
  Rocket01,
  code,
  test,
  tddContent,
  '/rocket-02',
  3,
  3,
  'rocket-01',
  SumBehavior,
  null,
  null,
  null
);
