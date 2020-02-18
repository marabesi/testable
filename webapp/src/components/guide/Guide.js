import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Buggy, {BuggyBug, BuggySleepy, BuggyHappy} from '../buggy/Buggy';
import AnimatedText from '../text-keyboard-animation/AnimatedText';
import { onHover } from '../../actions/guideAction';
import Next from '../icons/Next';

import '../../scss/attention.scss';

const mapDispatchToProps = dispatch => {
  return {
    onHover: hovered => dispatch(onHover(hovered))
  };
};

const mapStateToProps = state => ({
  hovered: state.guideReducer.hovered,
});

export class Guide extends Component {
  state = {
    afk: false,
  }

  track = () => {
    this.setState({
      afk: true
    });
  };

  componentDidMount = () => {
    this.trackActivity = setInterval(this.track, this.props.afkExpirationTime);
    document.addEventListener('keydown', this.checkUserAfk, false);
    document.addEventListener('mousemove', this.checkUserAfk, false);
  }

  componentWillUnmount = () => {
    clearInterval(this.trackActivity);
    document.removeEventListener('keydown', this.checkUserAfk, false);
    document.removeEventListener('mousemove', this.checkUserAfk, false);
  }

  checkUserAfk = () => {
    this.setState({
      afk: false
    });

    clearInterval(this.trackActivity);
    this.trackActivity = setInterval(this.track, this.props.afkExpirationTime);
  }

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
          <Fragment
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
                className={ `w-6 h-6 self-center no-underline text-white font-bold focus:outline-none mt-5 ${!this.props.hovered ? 'next': ''}` }
              >
                <Next className="fill-current text-white py-1 w-6 h-6" />
              </button>
            }
          </Fragment>
        );
      }

      return false;
    });
  }

  render() {
    const buggyStyle = {
      width: '250px',
      marginTop: '-165px',
      marginLeft: '-290px'
    };

    const buggyClass = 'absolute pin-t';
    const { guideContent, currentHint } = this.props;

    let buggy = <Buggy
      className={buggyClass}
      style={buggyStyle}
    />;

    if (this.props.invalidCode) {
      buggy = <BuggyBug
        className={buggyClass}
        style={buggyStyle}
      />;
    }

    if (this.state.afk) {
      buggy = <BuggySleepy
        className={buggyClass}
        style={buggyStyle}
      />;
    }

    if (guideContent[currentHint] && guideContent[currentHint].showBuggy && guideContent[currentHint].showBuggy.type === 'happy') {
      buggy = <BuggyHappy
        className={buggyClass}
        style={buggyStyle}
      />;
    }

    return (
      <div
        style={{minHeight: '220px'}}
        className="flex justify-center p-5 md:p-12 bg-testable-overlay"
      >
        <div className="flex flex-col justify-start relative w-full md:w-testable-guide">
          <div className="hidden md:block">
            { buggy }
          </div>
          { this.renderHint() }
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
  invalidCode: PropTypes.bool,
  afkExpirationTime: PropTypes.number,
};

Guide.defaultProps = {
  afkExpirationTime: 30000,
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);