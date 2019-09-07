import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scene from './Scene';
import DebugButton from '../debug/Button';
import { auth } from '../../pages/login/Auth';
import Emitter, { PROGRESS_UP, PROGRESS_DOWN } from '../../emitter/Emitter';
import { track } from '../../emitter/Tracking';

export default class SceneManager extends Component {
  
  state = {
    currentStep: 1
  };

  handlePreviousScene = () => {
    const current = this.state.currentStep;

    if (current === 1) {
      return false;
    }

    this.setState({
      currentStep: current - 1
    });

    Emitter.emit(PROGRESS_DOWN, { amount: auth.user.progress - 10 });
  }

  handleNextScene = () => {
    const current = this.state.currentStep;
    const total = this.props.content.steps.length;

    if (current === total) {
      return false;
    }

    this.setState({
      currentStep: current + 1
    });

    Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });

    track({
      section: this.props.identifier,
      action: 'next_scene|button_click',
      value: current,
    });
  }

  render() {
    const steps = this.props.content.steps || [];
    const scenes = [];
    const last = steps.length - 1;

    for (const [index, step] of steps.entries()) {
      if (step.step === this.state.currentStep) {
        scenes.push(
          <Scene
            key={index}
            text={step.content}
            button={step.button}
            step={this.state.currentStep}
            className="m-auto w-3/5"
            next={this.handleNextScene}
            lastScene={step.lastScene || (last === index)}
            handleLastScene={this.props.handleLastScene}
            showAlien={step.showAlien}
            showBuggy={step.showBuggy}
            onCompleted={step.onCompleted || {}}
          />
        );
      }
    }

    return (
      <React.Fragment>
        <DebugButton onClick={this.handlePreviousScene} value="previous" />
        <DebugButton onClick={this.handleNextScene} value="next" />
        <DebugButton onClick={this.props.handleLastScene} value="trigger last scene" />

        <div className="w-full -mt-20">
          { scenes }
        </div>
      </React.Fragment>
    );
  }
}

SceneManager.propTypes = {
  identifier: PropTypes.string,
  content: PropTypes.object,
  handleLastScene: PropTypes.func
};
