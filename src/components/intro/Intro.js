import React, { Component } from 'react';
import { Steps } from 'intro.js-react';

const isDebug = process.env.REACT_APP_DEBUG || false;

export default class Intro extends Component {

  render() {
    return (
      <Steps
        {...this.props}
        options={{
          disableInteraction: true,
          showStepNumbers: false,
          exitOnEsc: isDebug ? true : false,
          hidePrev: true,
          exitOnOverlayClick: false,
          showButtons: true,
          showBullets: false,
          showProgress: true,
        }}
      />
    );
  }
}