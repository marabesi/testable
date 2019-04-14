import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fakeAuth } from '../../pages/login/Auth';

import './profile.scss';

export default class Profile extends Component {

  state = {
    menu: false,
    successfullLoggedOut: false
  }

  constructor(){
    super();

    this.showMenu = this.showMenu.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    fakeAuth.signout(() => {
      this.setState({
        successfullLoggedOut: true,
        menu: false
      });
    })
  }

  showMenu() {
    this.setState({
      menu: !this.state.menu
    })
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
    const className = `profile relative cursor-pointer ${
      this.props.className ? this.props.className : ''
    }`;
    return (
      <div className={className} onClick={this.showMenu}>
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

        <ul className={`absolute mt-12 w-full bg-testable-overlay list-reset p-2 z-20 ${this.state.menu ? 'block' : 'hidden'}`}>
          <li className="cursor-pointer text-white" onClick={this.onLogout}>Logout</li>
        </ul>
      </div>
    );
  }
}
