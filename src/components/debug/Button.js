import React, { Component } from 'react';

/* eslint-disable-next-line */
const isDebug = process.env.REACT_APP_DEBUG || false;

export default class Button extends Component {

  render() {
    return (
      <>
        {isDebug && <input type="button" className="bg-white m-2" {...this.props} />}
      </>
    );
  }
}