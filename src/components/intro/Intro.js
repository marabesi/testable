import React, { Component } from 'react';
import { Steps } from 'intro.js-react';

import 'intro.js/introjs.css';
import './intro.scss';

/* eslint-disable-next-line */
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
          exitOnOverlayClick: isDebug ? true : false,
          showButtons: true,
          showBullets: false,
          showProgress: true,
          nextLabel: 'Próximo',
          prevLabel: 'Anterior',
          doneLabel: 'Estou pronto!'
        }}
      />
    );
  }
}