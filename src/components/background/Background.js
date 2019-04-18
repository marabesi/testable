import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class TutorialSteps extends Component {

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <style>
            {`
              body {
                background: url("assets/bg-loading.png"), #012345;
                background-position: center center;
                height: 100vh;
              }
            `}
          </style>
        </Helmet>
        {this.props.children}
      </React.Fragment>
    );
  }
}