import React, { Component } from 'react';
import tddContent from './rocket02-guide-content';
import Rocket from '../../components/rocket/Rocket';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';

const code = `function dividirGps(a, b) {
  return a / b
}`;

const test = `function testeDividirGpsEmDuasPartes() {
}`;

class Rocket02 extends Component {
  render() {
    return (<React.Fragment />);
  }
}

export default Rocket(
  Rocket02,
  code,
  test,
  tddContent,
  '/rocket-03',
  3,
  3,
  'rocket-02',
  SumBehavior,
  null,
  {},
  null
);
