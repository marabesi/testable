import React, { Component } from 'react';
import content from './completed-intro-content.json';
import { BuggyRocket } from '../../components/buggy/Buggy';
import TestExecutionAnimation, { DEFAULT_DELAY } from '../../components/test-execution-animation/TestExecutionAnimation';
import WrappedSceneContentManager from '../../components/scene-manager/SceneContentManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter.js';

export const RegularFlow = WrappedSceneContentManager(
  'completed-intro',
  content
);

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

  onAnimationCompleted = () => this.setState({ completed: true })

  redirect = () => Emitter.emit(LEVEL_UP)

  render() {
    return (
      <>
        <TestExecution
          onFinished={this.onAnimationCompleted}
          animationDelay={DEFAULT_DELAY}
        />
        <RegularFlow
          className={this.state.completed ? 'scale-in-center': 'hidden'}
          handleLastScene={this.redirect}
        />
      </>
    );
  }
}
