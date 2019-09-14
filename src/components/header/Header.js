import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserMenu from '../../components/user-menu/UserMenu';
import Level from '../../components/level/Level';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';
import Emitter, { LEVEL_UP, LEVEL_DOWN, PROGRESS_UP, PROGRESS_DOWN } from '../../emitter/Emitter';

import '../../scss/levelup-animation.scss';
import '../../scss/logo-animation.scss';

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export class Header extends React.Component {

  state = { 
    levelUp: false,
  };

  resetLevelUpAnimation() {
    setTimeout(() => {
      this.setState({
        levelUp: false
      });
    }, 500);
  }

  componentDidMount() {
    Emitter.addListener(LEVEL_UP, () => {
      this.setState({
        levelUp: true
      });

      const level = 1 + auth.user.level;
      auth.updateUserInfo({
        level: level,
        progress: 10
      });

      this.resetLevelUpAnimation();
    });

    Emitter.addListener(LEVEL_DOWN, () => {
      this.setState({
        levelUp: true
      });

      const level = auth.user.level - 1;
      auth.updateUserInfo({
        level: level,
        progress: 10
      });

      this.resetLevelUpAnimation();
    });

    // @ts-ignore
    Emitter.addListener(PROGRESS_UP, data => {
      this.setState({
        // @ts-ignore
        ...this.props.user.progress, progress: data.amount
      });

      auth.updateUserInfo({
        progress: data.amount
      }); 
    });

    // @ts-ignore
    Emitter.addListener(PROGRESS_DOWN, data => {
      this.setState({
        // @ts-ignore
        ...this.props.user.progress, progress: data.amount
      });

      auth.updateUserInfo({
        progress: data.amount
      }); 
    });
  }

  componentWillUnmount() {
    Emitter.removeAllListeners(LEVEL_UP);
    Emitter.removeAllListeners(LEVEL_DOWN);
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

  levelDown = () => {
    Emitter.emit(LEVEL_DOWN);
  }

  levelUp = () => {
    Emitter.emit(LEVEL_UP);
  }

  navigate = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <>
        <DebugButton onClick={this.levelUp} value="level up" />
        <DebugButton onClick={this.navigate} value="navigate" />
        <DebugButton onClick={this.levelDown} value="level down"/>
        <DebugButton onClick={this.goToIntroduction} value="go back to introduction"/>
        <DebugButton onClick={this.props.onSidebar} value="sidebar"/>

        <div className="flex justify-between pl-3 pr-3 pt-5 pb-5 ml-5 mr-5">
          <div className={ `user-progress ${this.state.levelUp ? 'wobble-ver-right' : ''}`}>
            <Level progress={this.props.user.progress} level={this.props.user.level} />
          </div>

          <UserMenu user={auth.user} onNotification={this.props.onSidebar} />
        </div>
      </>
    );
  }
}

Header.propTypes = {
  onSidebar: PropTypes.func,
  user: PropTypes.object,
};
//@ts-ignore
export default withRouter(connect(mapStateToProps)(Header));