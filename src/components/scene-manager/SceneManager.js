import React, { Component } from 'react';
import Background from '../background/Background';
import Scene from './Scene';
import Loading from '../loading/Loading';
import DebugButton from '../debug/Button';
import { Redirect } from 'react-router-dom';
import { auth } from '../../pages/login/Auth';
import Emitter, { LEVEL_UP, PROGRESS_UP, PROGRESS_DOWN } from '../../emitter/Emitter';
import PropTypes from 'prop-types';

export default class SceneManager extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      loading: false,
      currentStep: 1
    };

    this.handleNextScene = this.handleNextScene.bind(this);
    this.handlePreviousScene = this.handlePreviousScene.bind(this);
    this.handleLastScene = this.handleLastScene.bind(this);
  }

  handlePreviousScene() {
    const current = this.state.currentStep;

    if (current === 1) {
      return;
    }

    this.setState({
      currentStep: current - 1
    });

    Emitter.emit(PROGRESS_DOWN, { amount: auth.user.progress - 10 });
  }

  handleNextScene() {
    const current = this.state.currentStep;
    const total = this.props.content.steps.length;

    if (current === total) {
      return;
    }

    this.setState({
      currentStep: current + 1
    });

    Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });
  }

  renderStep() {
    const steps = this.props.content.steps;
    const scenes = [];

    for (let step in steps) {
      if (steps[step].step === this.state.currentStep) {
        scenes.push(<Scene
          key={step}
          text={steps[step].content}
          button={steps[step].button}
          step={this.state.currentStep}
          className="m-auto w-3/5"
          next={this.handleNextScene}
          lastScene={steps[step].lastScene}
          handleLastScene={this.handleLastScene}
          showAlien={steps[step].showAlien}
          onCompleted={steps[step].onCompleted || {}} />
        );
      }
    }

    return scenes;
  }

  handleLastScene() {
    Emitter.emit(LEVEL_UP, {
      tutorial: true,
    });

    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        redirect: true
      });
    }, 2000);
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }

    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/tutorial',
        }} />
      );
    }

    return (
      <Background>
        <div className="flex mt-10">
          <DebugButton onClick={this.handlePreviousScene} value="previous" />

          {this.renderStep()}

          <DebugButton onClick={this.handleNextScene} value="next" />
          <DebugButton onClick={this.handleLastScene} value="skip intro" />
        </div>
      </Background>
    );
  }
}

SceneManager.propTypes = {
  content: PropTypes.object
};
