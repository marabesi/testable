import React, { Component } from 'react';
import Profile from '../../components/profile/Profile';
import Level from '../../components/level/Level';
import { auth } from '../../pages/login/Auth';

const isDebug = process.env.REACT_APP_DEBUG || false;

export default class Header extends Component {

  constructor() {
    super();
    this.goToIntroduction = this.goToIntroduction.bind(this);
  }

  goToIntroduction() {
    auth.updateUserInfo({
      tutorial: false,
      level: 2
    });
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        {isDebug && <button className="bg-white m-2" onClick={this.goToIntroduction}>go back to introduction</button>}

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