import React, { Component } from 'react';
import content from './completed-end-content.json';
import { AlienRocket } from '../../components/alien/AlienSvg';
import TestExecutionAnimation, { DEFAULT_DELAY } from '../../components/test-execution-animation/TestExecutionAnimation';
import WrappedSceneContentManager from '../../components/scene-manager/SceneContentManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter.js';

export const RegularFlow = WrappedSceneContentManager(
  'completed-end',
  content
);

const fixedTests = [
  { test: 'executando teste para multiplicar motores', pass: true },
  { test: 'executando teste que remove o trem de pouso', pass: true },
  { test: 'executando teste para dividir o GPS', pass: false }
];

const TestExecution = TestExecutionAnimation(AlienRocket, fixedTests);

export default class CompletedEnd extends Component {

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
          className={this.state.completed ? 'scale-in-center' : 'hidden'}
          handleLastScene={this.redirect}
        />
      </>
    );
  }
}
