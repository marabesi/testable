import * as React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import { SvgBuggyLeft } from '../buggy/SvgBuggy';
import AlienSvg from '../alien/AlienSvg';

import '../../scss/slide-in-bck-right.scss';
import '../../scss/slide-in-bck-top.scss';

import './scene.scss';

const RELEASE_BUTTON = 2000;

export default class Scene extends React.Component {

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
    if (!this.state.disableNextButton) {
      if (this.props.lastScene) {
        this.props.handleLastScene();
        return;
      }

      this.props.next(event);

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
    }
  }

  render() {
    const { className } = this.props;
    const classes = `
      scene
      flex
      flex-col
      py-10 px-10
      text-2xl
      text-white
      relative
      ${className}
    `;

    let alienClass = 'hidden';

    if (this.props.showAlien) {
      alienClass = 'block';
    }
    
    if (this.props.showAlien && this.props.showAlien.animate) {
      alienClass = 'slide-in-bck-top';
    }

    return (
      <div className={classes}>
        <div className="flex">
          <AnimatedText
            className="w-2/3"
            text={this.props.text}
            onFinishedTyping={ () => this.onFinishedTyping() }
          />

          <SvgBuggyLeft className={
            `absolute pin-r w-1/3 mt-10 ${
              this.props.onCompleted.showBug && this.state.showNextButton ? 'slide-in-bck-right' : 'hidden'
            }
          `} />

          <AlienSvg className={
            `w-3/3 absolute w-1/3 pin-r pin-t -mt-6 ${alienClass}`
          }/>
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
  text: PropTypes.array,
  className: PropTypes.string,
  next: PropTypes.func,
  lastScene: PropTypes.bool,
  handleLastScene: PropTypes.func,
  button: PropTypes.string
};

Scene.defaultProps = {
  onCompleted: {}
};