import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './background.scss';

const mapStateToProps = state => ({
  options: state.optionsReducer.options,
  user: state.userReducer.user,
});

export class Background extends Component {

  render() {
    return (
      <>
        {
          !this.props.user.uid &&
          <div className="path">
            <div className="comet"></div>
          </div>
        }
        <div className={ this.props.options.animation ? 'stars' : 'stars-only' }></div>
        {this.props.children}
      </>
    );
  }
}

Background.propTypes = {
  children: PropTypes.node,
  options: PropTypes.object,
  user: PropTypes.object,
};

Background.defaultProps = {
  options: {},
  user: {},
};

export default connect(mapStateToProps)(Background);