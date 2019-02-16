import React, { Component } from 'react';

import './button.scss';

export default class Button extends Component {

  render() {
    const className = `button focus:outline-none ${this.props.className ? this.props.className: ''}`;
    return (
      <button className={className} onClick={this.props.onClick}>{this.props.description}</button>
    );
  }
}