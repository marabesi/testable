import React, { Component } from 'react';
import Button from './Button';
import AnimatedText from '../text-keyboard-animation/AnimatedText';

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
    this.setState({
      showNextButton: true
    });
  }

  onClick(event) {
    this.props.next(event);
  }

  render() {
    const className = `
      scene
      flex
      flex-col
      items-start py-10 px-10
      text-2xl
      text-white
      ${this.props.className ? this.props.className: ''}
    `;

    let next = '';

    if (this.state.showNextButton){
      next = <Button className="mt-10" description={this.props.button} onClick={this.onClick} />
    }

    return (
      <div className={className}>
        <div className="content">
          <AnimatedText text={this.props.text} onFinishedTyping={() => this.onFinishedTyping() }/>
        </div>
        {next}
      </div>
    );
  }
}