//@ts-nocheck
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import { BuggyLeft, BuggyBug, BuggyHappy,  BuggyHappyLeft } from '../buggy/Buggy';
import AlienSvg from '../alien/AlienSvg';

import './scene.scss';

const RELEASE_BUTTON = 2000;

const Scene = props => {

  const [showNextButton, setShowNextButton] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);

  const onFinishedTyping = () => {
    setTimeout(() => setShowNextButton(true), props.showNextButton);
  };

  const onClick = event => {
    if (disableNextButton) {
      return;
    }

    setDisableNextButton(true);

    setTimeout(() => {
      setDisableNextButton(false);
    }, props.releaseButton);

    if (props.lastScene) {
      props.handleLastScene();
      return;
    }

    props.next(event);
  };

  const { className } = props;
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

  if (props.showAlien) {
    alienClass = 'md:block';
  }

  if (props.showAlien && props.showAlien.animate) {
    alienClass = 'md:block md:slide-in-bck-top';
  }

  let buggyClass = '';

  if (props.showBuggy && !props.showBuggy.type) {
    buggyClass = 'md:block';
  }

  if (props.showBuggy && props.showBuggy.animate) {
    buggyClass = 'md:block md:slide-in-bck-right';
  }

  return (
    <div className={classes}>
      <div className="flex">
        <AnimatedText
          className="w-2/3"
          text={props.text}
          onFinishedTyping={ onFinishedTyping }
        />

        <BuggyLeft className={`absolute pin-r w-1/3 mt-10 hidden ${buggyClass}`} />

        <BuggyLeft
          className={
            `absolute pin-r w-1/3 mt-10 hidden ${
              props.onCompleted.showBug && showNextButton ? 'md:block md:slide-in-bck-right' : 'hidden'
            }
          `} />

        <BuggyHappyLeft
          className={
            `w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden ${
              props.onCompleted.type === 'happy' && showNextButton ? 'md:block md:slide-in-bck-right' : 'hidden'
            }`
          }
        />

        <AlienSvg className={
          `w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden ${alienClass}`
        }/>

        {
          props.showBuggy.type === 'bug' &&
            <BuggyBug
              style={{transform: 'scaleX(-1)'}}
              className={'w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden md:block'}
            />
        }

        {
          props.showBuggy.type === 'happy' &&
            <BuggyHappy
              style={{transform: 'scaleX(-1)'}}
              className={'w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden md:block'}
            />
        }
      </div>

      {
        showNextButton &&
          <Button
            className="absolute pin-b mb-8 scale-in-center"
            description={props.button}
            onClick={onClick}
            disabled={disableNextButton}
          />
      }
    </div>
  );
};

Scene.propTypes = {
  onCompleted: PropTypes.object,
  showAlien: PropTypes.object,
  text: PropTypes.array,
  className: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  lastScene: PropTypes.bool,
  handleLastScene: PropTypes.func,
  button: PropTypes.string,
  releaseButton: PropTypes.number,
  showNextButton: PropTypes.number,
  step: PropTypes.number
};

Scene.defaultProps = {
  onCompleted: {},
  showBuggy: false,
  releaseButton: RELEASE_BUTTON,
  showNextButton: 900,
};

export default Scene;