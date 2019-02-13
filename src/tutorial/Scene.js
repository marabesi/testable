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
  }

  onFinishedTyping() {
    this.setState({
      showNextButton: true
    });
  }

  render() {
    const className = `
      scene
      flex
      flex-col
      items-start py-10 px-10
      ${this.props.className ? this.props.className: ''}
    `;

    let next = '';

    if (this.state.showNextButton){
      next = <Button className="mt-10" description={this.props.button}/>
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