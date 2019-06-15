import React, { Component } from 'react';
import SvgBuggy from '../buggy/SvgBuggy';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import PropTypes from 'prop-types';
import { onHover } from '../../actions/guideAction';
import { connect } from 'react-redux';

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
                <svg className="fill-current py-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 129 129">
                  <g>
                    <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/>
                  </g>
                </svg>
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
  onHover: PropTypes.func,
  hovered: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);