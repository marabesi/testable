import React, { Component } from 'react';
import SvgBuggy from '../buggy/SvgBuggy';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import PropTypes from 'prop-types';

export default class Guide extends Component {

  renderHint() {
    return this.props.guideContent.map((item, index) => {
      if (index === this.props.currentHint) {
        return (
          <React.Fragment
            key={index}
          >
            <AnimatedText
              text={[
                item
              ]}
              onFinishedTyping={this.props.onFinishedTyping}
            />
            {
              this.props.showNext
              &&
              <button
                onClick={this.props.handleProgress}
                className="self-end no-underline text-white font-bold p-3 focus:outline-none"
              >
                Próximo &gt;
              </button>
            }
          </React.Fragment>
        );
      }

      return false;
    });
  }

  render() {
    return (
      <div className="flex justify-center p-12 min-h-screen bg-testable-overlay">
        <div className="flex flex-col justify-start relative" style={{ minWidth: '45%', maxWidth: '45%' }}>
          <SvgBuggy
            className="absolute pin-t"
            style={{
              transform: 'scaleX(-1)',
              width: '250px',
              marginTop: '-180px',
              marginLeft: '-290px'
            }}
          />
          {this.renderHint()}
        </div>
      </div>
    );
  }
}

Guide.propTypes = {
  guideContent: PropTypes.array,
  currentHint: PropTypes.number,
  showNext: PropTypes.bool,
  onFinishedTyping: PropTypes.func,
  handleProgress: PropTypes.func,
};
