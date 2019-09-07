import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { colors } from '../../tailwind';

export default class Background extends Component {

  render() {
    return (
      <React.Fragment>
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
        <div className="stars"></div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

Background.propTypes = {
  children: PropTypes.node
};