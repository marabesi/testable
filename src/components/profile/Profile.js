import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../../pages/login/Auth';
import PropTypes from 'prop-types';

import './profile.scss';

export default class Profile extends Component {

  state = {
    menu: false,
    successfullLoggedOut: false
  }

  constructor() {
    super();

    this.showMenu = this.showMenu.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    auth.signout(() => {
      this.setState({
        successfullLoggedOut: true,
        menu: false
      });
    });
  }

  showMenu() {
    this.setState({
      menu: !this.state.menu
    });
  }

  onBlur() {
    this.setState({
      menu: false
    });
  }

  render() {
    if (this.state.successfullLoggedOut) {
      return (
        <Redirect to={{
          pathname: '/'
        }} />
      );
    }

    const name = this.props.user.name;
    const email = this.props.user.email;
    const photo = this.props.user.photo;
    const propClass = this.props.className;

    const className = `profile flex cursor-pointer ${
      propClass ? propClass : ''
    }`;

    return (
      <div 
        className="relative outline-none"
        tabIndex="0"
        onBlur={this.onBlur}
        title={`${name} - ${email}`}
      >
        <div className={className} onClick={this.showMenu}>
          <div className="picture-holder">
            <img
              src={photo ? photo : 'https://placeimg.com/200/200/any'}
              alt={name}
              className="picture"
            />
          </div>
          <div className="info">
            <h2 className="title text-white text-base uppercase font-medium truncate" alt={name} title={name}>
              {name}
            </h2>
          </div>
        </div>
        <ul className={`w-full bg-testable-overlay list-reset p-1 mt-2 z-40 absolute ${this.state.menu ? 'block' : 'hidden'}`}>
          <li className="cursor-pointer text-white text-center" onClick={this.onLogout}>Logout</li>
        </ul>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string
};
