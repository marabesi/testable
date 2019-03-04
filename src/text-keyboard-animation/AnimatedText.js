import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TypedText from './TypedText';
import ReactDOMServer from "react-dom/server";

import './animated-text.scss';

export default class AnimatedText extends Component {

  renderText() {
    const text = [];
    this.props.text.forEach(element => {
      text.push(
        <p key={element.key} className={element.style}>{element.line}</p>
      )
    });

    return [ReactDOMServer.renderToStaticMarkup(text)];
  }

  render() {
    return (
      <TypedText
        strings={this.renderText()}
        onComplete={this.props.onFinishedTyping}
      />
    );
  }
}

AnimatedText.propTypes = {
  onFinishedTyping: PropTypes.func
}