//@ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '../../components/icons/Check';

import './test-execution-animation.scss';

const Error = props => {
  return (
    <svg viewBox="0 0 130.2 130.2" { ...props }>
      <circle className="path circle" fill="none" stroke="red" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
      <line className="path line" fill="none" stroke="red" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
      <line className="path line" fill="none" stroke="red" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
    </svg>
  );
};

const WrapperAnimation = (RocketComponent, testsToExecute) => {
  class TestExecutionAnimation extends Component {
    static propTypes = {
      history: PropTypes.object,
      animationDelay: PropTypes.number,
      onFinished: PropTypes.func
    };

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
      const { animationDelay } = this.props;

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
      const { animationDelay, onFinished } = this.props;

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

        if (onFinished) {
          onFinished();
        }

      }, animationDelay * 5);
    }

    render() {
      return (
        <div className={this.state.completed ? 'hidden' : 'w-5/6 m-auto flex items-center justify-center'}>
          <div className={`
            animation-container 
            ${this.state.showTests ? 'block' : 'hidden'}
            ${this.state.releaseTests ? 'slide-out-elliptic-top-fwd' : ''}
          `}>
            {this.state.tests.map((item, key) => {
              return (
                <div
                  key={key}
                  className="flex items-center justify-between slide-in-elliptic-left-fwd mb-10 mr-16"
                >
                  <h1 className="text-white text-2xl font-medium">
                    {item.test}
                  </h1>
                  {item.pass && <CheckIcon width="50px" height="50px" />}
                  {!item.pass && <Error width="50px" height="50px" />}
                </div>
              );
            })}
          </div>
          <RocketComponent className={`${this.state.releaseRocket ? 'bounce-out-top' : this.state.rocketDefaultClass}`} />
        </div>
      );
    }
  }
  return TestExecutionAnimation;
};

export default WrapperAnimation;