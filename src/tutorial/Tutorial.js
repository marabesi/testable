import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Scene from './Scene';
import content from '../tutorial-content.json';

import './tutorial.scss';

export default class Tutorial extends Component {

  constructor() {
    super();
    this.state = {
      tutorial: content.tutorial,
      currentStep: 1
    };
  }

  componentDidMount() {
  }

  renderStep() {
    const steps = this.state.tutorial.steps;

    for (let step in steps) {
      if (steps[step].step === this.state.currentStep) {
        return <Scene text={steps[step].content} button="Ok" step="{this.state.currentStep}" className="m-auto w-4/5"/>;
      }
    }
  }

  render() {
    return (
      <div className="tutorial flex">
        <Helmet>
          <style>{'body { background-color: #520F87; }'}</style>
        </Helmet>
        {this.renderStep()}
      </div>
    );
  }
}