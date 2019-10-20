//@ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '../../components/icons/Check';

export const DEFAULT_DELAY = 2000;

const WrapperAnimation = (RocketComponent, testsToExecute) => {
  class TestExecutionAnimation extends Component {
    static propTypes = {
      history: PropTypes.object,
      animationDelay: PropTypes.number,
      onFinished: PropTypes.func
    };

    static defaultProps = {
      animationDelay: DEFAULT_DELAY
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
            completed-intro
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
                  <CheckIcon width="50px" height="50px" />
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
