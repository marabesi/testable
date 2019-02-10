import React, { Component } from 'react';

import './button.scss';

export default class Button extends Component {

  render() {
    const className = `button outline-none ${this.props.className ? this.props.className: ''}`;
    return (
      <button className={className}>{this.props.description}</button>
    );
  }
}