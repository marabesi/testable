import React, { Component } from 'react';

const isDebug = process.env.REACT_APP_DEBUG || false;

export default class Button extends Component {

  render() {
    return (
      <React.Fragment>
        {isDebug && <input type="button" className="bg-white m-2" {...this.props} />}
      </React.Fragment>
    );
  }
}