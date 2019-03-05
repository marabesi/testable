import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Scene from './Scene';
import content from '../tutorial-content.json';

import './tutorial.scss';

const isDebug = process.env.REACT_APP_DEBUG || false;

export default class Tutorial extends Component {

  constructor() {
    super();
    this.state = {
      tutorial: content.tutorial,
      currentStep: 1
    };

    this.handleNextScene = this.handleNextScene.bind(this);
    this.handlePreviousScene = this.handlePreviousScene.bind(this);
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
    console.log('last')
  }

  render() {
    return (
      <div className="tutorial flex">
        { isDebug && <button onClick={this.handlePreviousScene}>previous</button>}

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

        { isDebug && <button onClick={this.handleNextScene}>next</button>}
      </div>
    );
  }
}