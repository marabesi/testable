import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import { BuggyLeft, BuggyBug, BuggyHappy,  BuggyHappyLeft } from '../buggy/Buggy';
import AlienSvg from '../alien/AlienSvg';

import './scene.scss';

const RELEASE_BUTTON = 2000;

export default class Scene extends Component {

  state = {
    showNextButton: false,
    disableNextButton: false
  };

  onFinishedTyping() {
    setTimeout(() => {
      this.setState({
        showNextButton: true
      });
    }, 900);
  }

  /**
   * @param {Event} event
   */
  onClick = event => {
    if (this.state.disableNextButton) {
      return;
    }

    this.setState({
      //@ts-ignore
      ...this.state.disableNextButton, disableNextButton: true
    });

    setTimeout(() => {
      this.setState({
        //@ts-ignore
        ...this.state.disableNextButton, disableNextButton: false
      });
    }, RELEASE_BUTTON);

    if (this.props.lastScene) {
      this.props.handleLastScene();
      return;
    }

    this.props.next(event);
  }

  render() {
    const { className } = this.props;
    const classes = `
      scene
      flex
      flex-col
      py-10 px-10
      text-lg
      md:text-2xl
      text-white
      relative
      ${className}
    `;

    let alienClass = 'hidden';

    if (this.props.showAlien) {
      alienClass = 'md:block';
    }

    if (this.props.showAlien && this.props.showAlien.animate) {
      alienClass = 'md:block md:slide-in-bck-top';
    }

    let buggyClass = '';

    if (this.props.showBuggy && !this.props.showBuggy.type) {
      buggyClass = 'md:block';
    }

    if (this.props.showBuggy && this.props.showBuggy.animate) {
      buggyClass = 'md:block md:slide-in-bck-right';
    }

    return (
      <div className={classes}>
        <div className="flex">
          <AnimatedText
            className="w-2/3"
            text={this.props.text}
            onFinishedTyping={ () => this.onFinishedTyping() }
          />

          <BuggyLeft className={`absolute pin-r w-1/3 mt-10 hidden ${buggyClass}`} />

          <BuggyLeft
            className={
              `absolute pin-r w-1/3 mt-10 hidden ${
                this.props.onCompleted.showBug && this.state.showNextButton ? 'md:block md:slide-in-bck-right' : 'hidden'
              }
          `} />

          <BuggyHappyLeft
            className={
              `w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden ${
                this.props.onCompleted.type === 'happy' && this.state.showNextButton ? 'md:block md:slide-in-bck-right' : 'hidden'
              }`
            }
          />

          <AlienSvg className={
            `w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden ${alienClass}`
          }/>

          {
            this.props.showBuggy.type === 'bug' &&
            <BuggyBug
              style={{transform: 'scaleX(-1)'}}
              className={'w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden md:block'}
            />
          }

          {
            this.props.showBuggy.type === 'happy' &&
            <BuggyHappy
              style={{transform: 'scaleX(-1)'}}
              className={'w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden md:block'}
            />
          }
        </div>

        {
          this.state.showNextButton &&
          <Button
            className="absolute pin-b mb-8 scale-in-center"
            description={this.props.button}
            onClick={this.onClick}
            disabled={this.state.disableNextButton}
          />
        }
      </div>
    );
  }
}

Scene.propTypes = {
  onCompleted: PropTypes.object,
  showAlien: PropTypes.object,
  showBuggy: PropTypes.bool,
  text: PropTypes.array,
  className: PropTypes.string,
  next: PropTypes.func,
  lastScene: PropTypes.bool,
  handleLastScene: PropTypes.func,
  button: PropTypes.string
};

Scene.defaultProps = {
  onCompleted: {},
  showBuggy: false
};