import React, { Component } from 'react';
import tddContent from './guide-content';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';
import Rocket from '../../components/rocket/Rocket';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
}`;

class Tdd extends Component {
  render() {
    return (<React.Fragment />);
  }
}

export default Rocket(
  Tdd,
  code,
  test,
  tddContent,
  '/tdd-end',
  1,
  1,
  'tdd',
  SumBehavior,
  0,
  null,
  null
);

