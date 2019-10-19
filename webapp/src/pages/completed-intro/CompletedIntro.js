//@ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import content from './completed-intro-content.json';
import { BuggyRocket } from '../../components/buggy/Buggy';
import WrappedSceneContentManager from '../../components/scene-manager/SceneContentManager';
import CheckIcon from '../../components/icons/Check';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter.js';

import './completed-intro.scss';

export const RegularFlow = WrappedSceneContentManager(
  'completed-intro',
  content
);

export const DEFAULT_DELAY = 2000;

const fixedTests = [
  'executando teste para multiplicar motores',
  'executando teste que remove o trem de pouso',
  'executando teste para dividir o GPS'
];

export default class CompletedIntro extends Component {

  state = {
    tests: [],
    showTests: false,
    releaseRocket: false,
    releaseTests: false,
    completed: false,
    rocketDefaultClass: ''
  };

  componentDidMount = () => {
    this.startFlow();
  }

  startFlow = () => {
    const { testsToExecute, animationDelay } = this.props;

    setTimeout(() => {
      this.setState({
        ...this.state.rocketDefaultClass, rocketDefaultClass: 'wobble-hor-bottom'
      });
    }, animationDelay / 2);

    this.setState({
      ...this.state.showTests, showTests: true
    });

    let pointer = 0;
    const buildTests = setInterval(() => {
      const current = this.state.tests;
      current.push(testsToExecute[pointer]);

      this.setState({
        ...this.state.tests, tests: current
      });

      pointer++;

      if (current.length === testsToExecute.length) {
        clearInterval(buildTests);
        this.startAnimation();
      }
    }, animationDelay);
  }

  startAnimation = () => {
    const { animationDelay } = this.props;

    setTimeout(() => {
      this.setState({
        ...this.state.releaseRocket, releaseRocket: true
      });
    }, animationDelay);

    setTimeout(() => {
      this.setState({
        ...this.state.releaseTests, releaseTests: true
      });
    }, animationDelay * 4);

    setTimeout(() => {
      this.setState({
        ...this.state.completed, completed: true
      });
    }, animationDelay * 5);
  }
  
  redirect = () => {
    Emitter.emit(LEVEL_UP);
  }

  render() {
    return (
      <>
        <RegularFlow
          className={this.state.completed ? 'scale-in-center': 'hidden'}
          handleLastScene={this.redirect}
        />

        <div className={this.state.completed ? 'hidden': 'w-5/6 m-auto flex items-center justify-center'}>
          <div className={`
            completed-intro
            ${this.state.showTests ? 'block' : 'hidden'}
            ${this.state.releaseTests ? 'slide-out-elliptic-top-fwd': ''}
          `}>
            { this.state.tests.map((item, key) => {
              return (
                <div
                  key={key}
                  className="flex items-center justify-between slide-in-elliptic-left-fwd mb-10 mr-16"
                >
                  <h1 className="text-white text-2xl font-medium">
                    { item }
                  </h1>
                  <CheckIcon width="50px" height="50px" />
                </div>
              );
            }) }
          </div>
          <BuggyRocket className={`${this.state.releaseRocket ? 'bounce-out-top' : this.state.rocketDefaultClass}`}/>
        </div>
      </>
    );
  }
}

CompletedIntro.propTypes = {
  testsToExecute: PropTypes.array,
  history: PropTypes.object,
  animationDelay: PropTypes.number
};

CompletedIntro.defaultProps = {
  testsToExecute: fixedTests,
  animationDelay: DEFAULT_DELAY
};