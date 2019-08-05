import React, { Component } from 'react';
import tddContent from './rocket01-guide-content';
import Rocket from '../../components/rocket/Rocket';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
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
  2,
  2,
  'rocket-01',
  SumBehavior,
  null,
  {},
  null
);
