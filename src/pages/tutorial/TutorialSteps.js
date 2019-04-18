import React, { Component } from 'react';
import { Steps } from 'intro.js-react';

export default class TutorialSteps extends Component {

  render() {
    return (
      <Steps
        {...this.props}
        options={{
          disableInteraction: true,
          showStepNumbers: false,
          exitOnEsc: false,
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