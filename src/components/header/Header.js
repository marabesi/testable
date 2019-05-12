import React, { Component } from 'react';
import Profile from '../../components/profile/Profile';
import Level from '../../components/level/Level';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';
import Emitter, { LEVEL_UP, PROGRESS_UP, PROGRESS_DOWN } from '../../emitter/Emitter';

export default class Header extends Component {

  state = { 
    levelup: false,
    user: {},
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
    this.setState({
      user: auth.user
    });

    Emitter.addListener(LEVEL_UP, () => {
      this.setState({
        levelup: true
      });

      const level = 1 + auth.user.level;
      auth.updateUserInfo({
        level: level,
        progress: 10
      });

      this.resetLevelUpAnimation();
    });

    Emitter.addListener(PROGRESS_UP, (data) => {
      this.setState({
        ...this.state.user.progress, progress: data.amount
      });

      auth.updateUserInfo({
        progress: data.amount
      }); 
    });

    Emitter.addListener(PROGRESS_DOWN, (data) => {
      this.setState({
        ...this.state.user.progress, progress: data.amount
      });

      auth.updateUserInfo({
        progress: data.amount
      }); 
    });
  }

  componentWillUnmount() {
    Emitter.removeAllListeners(LEVEL_UP);
    Emitter.removeAllListeners(PROGRESS_UP);
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
            <Level progress={this.state.user.progress} level={this.state.user.level} />
          </div>

          <div className="user-info">
            <Profile user={auth.user} />
          </div>
        </div>

        <div className="flex w-full justify-center relative">
          <img src="assets/logo.png" className="hover:pulsate-fwd h-8 hidden lg:block" alt="logotipo" title="Testable - Ferramenta gamificada"/>
        </div>
      </React.Fragment>
    );
  }
}