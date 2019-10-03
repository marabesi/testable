import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { colors } from '../../tailwind';

const mapStateToProps = state => ({
  options: state.optionsReducer.options
});

export class Background extends Component {

  render() {
    return (
      <>
        <Helmet>
          <style>
            {`
              body {
                background: url("assets/bg-loading.png"), ${colors['blue-dark']};
                background-position: center 100%;
                height: 100vh;
                overflow: hidden;
              }
            `}
          </style>
        </Helmet>
        <div className={ this.props.options.animation ? 'stars' : '' }></div>
        {this.props.children}
      </>
    );
  }
}

Background.propTypes = {
  children: PropTypes.node,
  options: PropTypes.object,
};

Background.defaultProps = {
  options: {}
};

export default connect(mapStateToProps)(Background);