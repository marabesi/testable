import React, { Component } from 'react';
import Typing, {Cursor} from 'react-typing-animation';
import PropTypes from 'prop-types';

import './animated-text.scss';

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
      <Typing
        onFinishedTyping={this.props.onFinishedTyping}
        cursorClassName="cursor"
        hideCursor={false}
        {...this.props}
      >
        <Typing.Delay ms={100}/>
        {this.renderText()}
        <Cursor className="cursor" />
      </Typing>
    );
  }
}

AnimatedText.propTypes ={
  onFinishedTyping: PropTypes.func
}
