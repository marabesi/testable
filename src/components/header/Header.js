import React, { Component } from 'react';
import UserMenu from '../../components/user-menu/UserMenu';
import Level from '../../components/level/Level';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';
import Emitter, { LEVEL_UP, PROGRESS_UP, PROGRESS_DOWN } from '../../emitter/Emitter';
import PropTypes from 'prop-types';

import '../../scss/levelup-animation.scss';
import '../../scss/logo-animation.scss';

export default class Header extends Component {

  state = { 
    levelup: false,
    user: {},
  };

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
    Emitter.removeAllListeners(PROGRESS_DOWN);
  }

  goToIntroduction = () => {
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
        <DebugButton onClick={this.props.onSidebar} value="sidebar"/>

        <div className="flex justify-between pl-3 pr-3 pt-5 ml-5 mr-5">
          <div className={ `user-progress ${this.state.levelup ? 'wobble-ver-right' : ''}`}>
            <Level progress={this.state.user.progress} level={this.state.user.level} />
          </div>

          <UserMenu user={auth.user} onNotification={this.props.onSidebar} />
        </div>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  onSidebar: PropTypes.func
};