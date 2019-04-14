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
        <div className="picture-holder">
          <img
            src="https://placeimg.com/200/200/any"
            alt={name}
            className="picture"
          />
        </div>
        <div className="info">
          <h2 className="title text-white text-base uppercase font-medium" alt={name} title={name}>
            {name}
          </h2>
        </div>
      </div>
    );
  }
}
