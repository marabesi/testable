import { useState } from 'react';
import Button from '../../buttons/primary/Primary';
import AnimatedText, { TextItem } from '../text-keyboard-animation/AnimatedText';
import { BuggyLeft, BuggyBug, BuggyHappy,  BuggyHappyLeft } from '../../images/buggy/Buggy';
import AlienSvg from '../../images/alien/AlienSvg';

import './scene.scss';

const RELEASE_BUTTON = 2000;

interface Props {
  onCompleted?: any,
  showAlien?: any,
  text: TextItem[],
  className?: string,
  next?: any,
  previous?: any,
  lastScene?: boolean,
  handleLastScene?: any,
  button?: string,
  releaseButton?: number,
  showNextButton?: number,
  step?: number,
  showBuggy?: any,
}

const Scene = ({
  onCompleted,
  showAlien,
  text,
  className,
  next,
  lastScene,
  handleLastScene,
  button,
  releaseButton,
  showNextButton: nextButton,
  showBuggy
}: Props) => {
  const [showNextButton, setShowNextButton] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);

  const onFinishedTyping = () => {
    setTimeout(() => setShowNextButton(true), nextButton);
  };

  const onClick = event => {
    if (disableNextButton) {
      return;
    }

    setDisableNextButton(true);

    setTimeout(() => {
      setDisableNextButton(false);
    }, releaseButton);

    if (lastScene) {
      handleLastScene();
      return;
    }

    next(event);
  };

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

  if (showAlien) {
    alienClass = 'md:block';
  }

  if (showAlien && showAlien.animate) {
    alienClass = 'md:block md:slide-in-bck-top';
  }

  let buggyClass = '';

  if (showBuggy.type) {
    buggyClass = 'md:block';
  }

  if (showBuggy.animate) {
    buggyClass += ' md:slide-in-bck-right';
  }

  return (
    <div className={classes}>
      <div className="flex">
        <AnimatedText
          className="w-2/3"
          text={text}
          onFinishedTyping={ onFinishedTyping }
        />

        <BuggyLeft className={`absolute pin-r w-1/3 mt-10 hidden ${buggyClass}`} />

        <BuggyLeft
          className={
            `absolute pin-r w-1/3 mt-10 hidden ${
              onCompleted.showBug && showNextButton ? 'md:block md:slide-in-bck-right' : 'hidden'
            }
          `} />

        <BuggyHappyLeft
          className={
            `w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden ${
              onCompleted.type === 'happy' && showNextButton ? 'md:block md:slide-in-bck-right' : 'hidden'
            }`
          }
        />

        <AlienSvg className={
          `w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden ${alienClass}`
        }/>

        {
          showBuggy.type === 'bug' &&
          <BuggyBug
            style={{transform: 'scaleX(-1)'}}
            className={'w-3/3 absolute w-1/3 pin-r pin-t -mt-6 hidden md:block'}
          />
        }

        {
          showBuggy.type === 'happy' &&
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
          description={button}
          onClick={onClick}
          disabled={disableNextButton}
        />
      }
    </div>
  );
};

Scene.defaultProps = {
  text: [],
  onCompleted: {},
  showBuggy: {},
  releaseButton: RELEASE_BUTTON,
  showNextButton: 900,
};

export default Scene;