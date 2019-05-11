import React, { Component } from 'react';
import Profile from '../../components/profile/Profile';
import Level from '../../components/level/Level';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

export default class Header extends Component {

  state = { 
    levelup: false
  };

  constructor() {
    super();
    this.goToIntroduction = this.goToIntroduction.bind(this);
  }

  resetLevelUpAnimation() {
    setTimeout(() => {
      this.setState({
        levelup: false
      });
    }, 500);
  }
  componentDidMount() {
    Emitter.addListener(LEVEL_UP, (data) => {
      this.setState({
        levelup: true
      });

      const level = data.increase + auth.user.level;
      auth.updateUserInfo({
        level: level
      });

      this.resetLevelUpAnimation();
    });
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
          <div className={ `user-progress  ${this.state.levelup ? 'wobble-ver-right' : ''}`}>
            <Level progress={50} level={auth.user.level} />
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