import React, { Component } from 'react';
import Button from './Button';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import SvgBuggy from '../buggy/SvgBuggy';
import AlienSvg from '../alien/AlienSvg';

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
      return {
        isLastScene: true
      };
    }

    this.props.next(event);
  }

  render() {
    const className = `
      scene
      flex
      flex-col
      py-10 px-10
      text-2xl
      text-white
      relative
      ${this.props.className ? this.props.className: ''}
    `;

    let next = '';

    if (this.state.showNextButton){
      next = <Button className="absolute pin-b mb-8 scale-in-center" description={this.props.button} onClick={this.onClick} />
    }

    return (
      <div className={className}>
        <div className="flex">
          <AnimatedText
            className="w-2/3"
            text={this.props.text}
            onFinishedTyping={ () => this.onFinishedTyping() }
          />
          {this.props.onCompleted.showBug && this.state.showNextButton && <SvgBuggy className="absolute pin-r w-1/3 mt-10" />}
          {this.props.showAlien && <AlienSvg className="w-3/3 absolute w-1/3 pin-r pin-t"/>}
        </div>

        {next}
      </div>
    );
  }
}