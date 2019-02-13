import React, { Component } from 'react';
import Typing, {Cursor} from 'react-typing-animation';

export default class AnimatedText extends Component {

  renderText() {
    const text = [];
    this.props.text.forEach(element => {
      text.push(
        <p key={element.key} className={element.style}>{element.line}</p>
      )
    });

    return text;
  }

  render() {
    return (
      <Typing onFinishedTyping={this.props.onFinishedTyping}>
        <Typing.Delay ms={500}/>
        {this.renderText()}
        <Cursor />
      </Typing>
    );
  }
}
