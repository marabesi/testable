import React, { Component } from 'react';
import Typed from 'typed.js';

export default class TypedText extends Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 40,
      showCursor: false,
    };

    if (typeof this.props.onComplete === 'function') {
      options.onComplete = this.props.onComplete;
    }

    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <div className="wrap">
        <div className="type-wrap">
          <span
            ref={(el) => { this.el = el; }}
          />
        </div>
      </div>
    );
  }
}
