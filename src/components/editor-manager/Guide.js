import React, { Component } from 'react';
import SvgBuggy from '../buggy/SvgBuggy';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import PropTypes from 'prop-types';
import { onHover } from '../../actions/guideAction';
import { connect } from 'react-redux';
import Next from '../icons/Next';

import '../../scss/attention.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    onHover: hovered => dispatch(onHover(hovered))
  };
};

const mapStateToProps = (state) => ({
  hovered: state.guideReducer.hovered
});

export class Guide extends Component {

  onHover = () => {
    this.props.onHover(true);
  }

  offHover = () => {
    this.props.onHover(false);
  }

  handleProgress = () => {
    this.offHover();
    this.props.handleProgress();
  }

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
                onClick={this.handleProgress}
                onMouseEnter={this.onHover}
                onMouseLeave={this.offHover}
                className={ `w-6 h-6 self-end no-underline text-white font-bold focus:outline-none ${!this.props.hovered ? 'next': ''}` }
              >
                <Next className="fill-current text-white py-1 w-6 h-6" />
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
      <div className="flex justify-center p-12 bg-testable-overlay" style={{ minHeight: '220px' }}>
        <div className="flex flex-col justify-start relative" style={{ minWidth: '45%', maxWidth: '45%' }}>
          <SvgBuggy
            className="absolute pin-t"
            style={{
              transform: 'scaleX(-1)',
              width: '250px',
              marginTop: '-165px',
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
  onHover: PropTypes.func,
  hovered: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);