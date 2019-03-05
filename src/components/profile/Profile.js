import React, { Component } from 'react';

import './profile.scss';

export default class Profile extends Component {
  render() {
    const name = this.props.user.name;
    const className = `profile ${
      this.props.className ? this.props.className : ''
    }`;
    return (
      <div className={className}>
        <div className="picture-holder border-2 border-white">
          <img
            src="https://placeimg.com/200/200/any"
            alt={name}
            className="picture"
          />
        </div>
        <div className="info">
          <h2 className="title text-white" alt={name} title={name}>
            {name}
          </h2>
          <span className="icon text-white">}</span>
        </div>
      </div>
    );
  }
}
