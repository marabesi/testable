import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import TypedText from './TypedText';

export default class AnimatedText extends Component {

  renderText() {
    /** @type {JSX.Element[]} */
    const text = [];
    const prop = this.props.text || [];
    // @ts-ignore
    prop.forEach(element => {
      text.push(
        <p key={element.key} className={element.style}>{element.line}</p>
      );
    });

    // @ts-ignore
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
  text: PropTypes.array,
  onFinishedTyping: PropTypes.func
};