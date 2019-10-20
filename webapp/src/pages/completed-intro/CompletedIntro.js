//@ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import content from './completed-intro-content.json';
import { BuggyRocket } from '../../components/buggy/Buggy';
import TestExecutionAnimation from '../../components/test-execution-animation/TestExecutionAnimation';
import WrappedSceneContentManager from '../../components/scene-manager/SceneContentManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter.js';

import './completed-intro.scss';

export const RegularFlow = WrappedSceneContentManager(
  'completed-intro',
  content
);

export const DEFAULT_DELAY = 2000;

const fixedTests = [
  { test: 'executando teste para multiplicar motores', pass: true },
  { test: 'executando teste que remove o trem de pouso', pass: true },
  { test: 'executando teste para dividir o GPS', pass: true }
];

const TestExecution = TestExecutionAnimation(BuggyRocket, fixedTests);

export default class CompletedIntro extends Component {

  state = {
    completed: false
  };

  onAnimationCompleted = () => {
    this.setState({
      completed: true
    });
  }

  redirect = () => Emitter.emit(LEVEL_UP)

  render() {
    return (
      <>
        <TestExecution
          onFinished={this.onAnimationCompleted}
        />
        <RegularFlow
          className={this.state.completed ? 'scale-in-center': 'hidden'}
          handleLastScene={this.redirect}
        />
      </>
    );
  }
}

CompletedIntro.propTypes = {
  history: PropTypes.object,
  animationDelay: PropTypes.number
};
