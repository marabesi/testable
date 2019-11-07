import * as React from 'react';
import Typed from 'typed.js';

export default class TypedText extends React.Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 15,
      showCursor: false,
      startDelay: 200,
    };

    if (typeof this.props.onComplete === 'function') {
      options.onComplete = this.props.onComplete;
    }

    // @ts-ignore
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    if (this.typed) {
      this.typed.destroy();
    }
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

TypedText.defaultProps = {
  strings: []
};
