import React, { Component } from 'react';
import Profile from '../../components/profile/Profile';
import Level from '../../components/level/Level';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';

export default class Header extends Component {

  constructor() {
    super();
    this.goToIntroduction = this.goToIntroduction.bind(this);
  }

  goToIntroduction() {
    auth.updateUserInfo({
      tutorial: false,
      level: 1
    });
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <DebugButton onClick={this.goToIntroduction} value="go back to introduction"/>

        <div className="flex justify-between pl-3 pr-3 mt-3">
          <div className="user-progress">
            <Level progress="50" level={auth.user.level} />
          </div>

          <div className="user-info">
            <Profile user={auth.user} />
          </div>
        </div>

        <div className="flex w-full justify-center relative">
          <img src="assets/logo.png" className="h-8 hidden lg:block" alt="logotipo" />
        </div>
      </React.Fragment>
    );
  }
}