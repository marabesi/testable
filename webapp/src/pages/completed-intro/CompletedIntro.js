import React, { Component } from 'react';
import PropTypes from 'prop-types';
import content from './completed-intro-content.json';
import WrappedSceneContentManager from '../../components/scene-manager/SceneContentManager';
import CheckIcon from '../../components/icons/Check';

import './completed-intro.scss';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter.js';

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
    showTests: false
  };

  handleLastScene = () => {
    this.setState({
      //@ts-ignore
      ...this.state.showTests, showTests: true
    });

    const { testsToExecute } = this.props;

    let pointer = 0;
    const buildTests = setInterval(() => {
      const current = this.state.tests;
      current.push(testsToExecute[pointer]);

      this.setState({
        tests: current
      });

      pointer++;

      if (current.length === testsToExecute.length) {
        clearInterval(buildTests);
        this.redirect();
      }
    }, DEFAULT_DELAY);
  }

  redirect = () => {
    setTimeout(() => Emitter.emit(LEVEL_UP), DEFAULT_DELAY);
  }

  render() {
    if (this.state.showTests === false) {
      return (
        <RegularFlow handleLastScene={this.handleLastScene} />
      );
    }

    return (
      <div className="completed-intro">
        <div className="w-4/5 m-auto">
          {
            this.state.tests.map((item, key) => {
              return (
                <div
                  key={key}
                  className="test-container-check flex slide-in-elliptic-left-fwd"
                >
                  <h1 className="text-white">
                    { item }
                  </h1>
                  <CheckIcon />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

CompletedIntro.propTypes = {
  testsToExecute: PropTypes.array,
  history: PropTypes.object
};

CompletedIntro.defaultProps = {
  testsToExecute: fixedTests
};