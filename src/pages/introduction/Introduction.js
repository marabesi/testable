import React, { Component } from 'react';
import Background from '../../components/background/Background';
import Scene from '../../components/introduction/Scene';
import content from '../../introduction-content.json';
import Loading from '../../components/loading/Loading';
import { Redirect } from 'react-router-dom';
import { auth } from '../login/Auth';
import Header from '../../components/header/Header';

import './introduction.scss';

const isDebug = process.env.REACT_APP_DEBUG || false;

export default class Introduction extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      loading: false,
      tutorial: content.tutorial,
      currentStep: 1
    };

    this.handleNextScene = this.handleNextScene.bind(this);
    this.handlePreviousScene = this.handlePreviousScene.bind(this);
    this.handleLastScene = this.handleLastScene.bind(this);
  }

  handlePreviousScene() {
    const current = this.state.currentStep;

    this.setState({
      tutorial: content.tutorial,
      currentStep: current - 1
    });
  }

  handleNextScene() {
    const current = this.state.currentStep;

    this.setState({
      tutorial: content.tutorial,
      currentStep: current + 1
    });
  }

  renderStep() {
    const steps = this.state.tutorial.steps;
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
    auth.updateUserInfo({
      tutorial: true,
      level: 2
    });

    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        redirect: true
      });
    }, 1000);
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }

    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/tutorial',
          state: this.state
        }} />
      );
    }

    return (
      <Background>
        <Header />

        <div className="flex mt-10">
          {isDebug && <button className="bg-white m-2" onClick={this.handlePreviousScene}>previous</button>}

          {this.renderStep()}

          {isDebug && <button className="bg-white m-2" onClick={this.handleNextScene}>next</button>}
          {isDebug && <button className="bg-white m-2" onClick={this.handleLastScene}>skip intro</button>}
        </div>
      </Background>
    );
  }
}