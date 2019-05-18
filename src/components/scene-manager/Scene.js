import React, { Component } from 'react';
import Button from './Button';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import SvgBuggy from '../buggy/SvgBuggy';
import AlienSvg from '../alien/AlienSvg';
import PropTypes from 'prop-types';

import './scene.scss';

export default class Scene extends Component {

  constructor() {
    super();
    this.state = {
      showNextButton: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onFinishedTyping() {
    setTimeout(() => {
      this.setState({
        showNextButton: true
      });
    }, 900);
  }

  onClick(event) {
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
      text-2xl
      text-white
      relative
      ${className}
    `;

    return (
      <div className={classes}>
        <div className="flex">
          <AnimatedText
            className="w-2/3"
            text={this.props.text}
            onFinishedTyping={ () => this.onFinishedTyping() }
          />
          {
            this.props.onCompleted.showBug &&
            this.state.showNextButton &&
            <SvgBuggy className="absolute pin-r w-1/3 mt-10" />
          }
          {
            this.props.showAlien &&
            <AlienSvg className="w-3/3 absolute w-1/3 pin-r pin-t -mt-6"/>
          }
        </div>

        {
          this.state.showNextButton &&
          <Button
            className="absolute pin-b mb-8 scale-in-center"
            description={this.props.button}
            onClick={this.onClick}
          />
        }
      </div>
    );
  }
}

Scene.propTypes = {
  onCompleted: PropTypes.object,
  showAlien: PropTypes.bool,
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