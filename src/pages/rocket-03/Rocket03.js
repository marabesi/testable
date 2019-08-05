import React, { Component } from 'react';
import tddContent from './rocket03-guide-content';
import Rocket from '../../components/rocket/Rocket';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function teste() {
}`;

class Rocket03 extends Component {
  render() {
    return (<React.Fragment />);
  }
}

export default Rocket(
  Rocket03,
  code,
  test,
  tddContent,
  '/rocket-03',
  1,
  1,
  '/completed',
  SumBehavior,
  null,
  {},
  null
);
