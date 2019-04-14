import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Scene from '../../components/introduction/Scene';
import content from '../../introduction-content.json';
import { fakeAuth } from '../login/Auth';
import { Redirect } from 'react-router-dom';

import './introduction.scss';

const isDebug = process.env.REACT_APP_DEBUG || false;

export default class Introduction extends Component {

  constructor() {
    super();
    this.state = {
      code: 'var = 1;',
      options: {
        mode: 'javascript',
        lineNumbers: false,
      },
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
          step="{this.state.currentStep}"
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
    fakeAuth.updateUserInfo({
      tutorial: true,
      level: 2
    });

    this.setState({
      redirect: true
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/tutorial',
          state: this.state
        }} />
      );
    }

    return (
      <div className="introduction flex">
        {isDebug && <button className="bg-white m-2" onClick={this.handlePreviousScene}>previous</button>}

        <Helmet>
          <style>
            {`
              body {
                background-image: url("assets/bg.png");
                background-position: center center;
              }
            `}
          </style>
        </Helmet>
        {this.renderStep()}

        {isDebug && <button className="bg-white m-2" onClick={this.handleNextScene}>next</button>}
        {isDebug && <button className="bg-white m-2" onClick={this.handleLastScene}>skip intro</button>}
      </div>
    );
  }
}