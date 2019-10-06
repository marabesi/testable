import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserMenu from '../../components/user-menu/UserMenu';
import Level from '../../components/level/Level';
import DebugButton from '../../components/debug/Button';
import { updateUser } from '../../actions/userAction';
import AchievementIcon from '../icons/Achievement';
import Emitter, { LEVEL_UP, LEVEL_DOWN, PROGRESS_UP, PROGRESS_DOWN } from '../../emitter/Emitter';

import '../../scss/levelup-animation.scss';
import '../../scss/logo-animation.scss';

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => {
  return {
    updateUser: data => dispatch(updateUser(data))
  };
};

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

      const level = 1 + this.props.user.level;
      this.props.updateUser({
        level,
        progress: 10
      });

      this.resetLevelUpAnimation();
    });

    Emitter.addListener(LEVEL_DOWN, () => {
      this.setState({
        levelUp: true
      });

      const level = this.props.user.level - 1;
      this.props.updateUser({
        level,
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

      this.props.updateUser({
        progress: data.amount
      });
    });

    // @ts-ignore
    Emitter.addListener(PROGRESS_DOWN, data => {
      this.setState({
        // @ts-ignore
        ...this.props.user.progress, progress: data.amount
      });

      this.props.updateUser({
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
    this.props.updateUser({
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

  render() {
    return (
      <>
        <DebugButton onClick={this.levelUp} value="level up" />
        <DebugButton onClick={this.levelDown} value="level down"/>
        <DebugButton onClick={this.goToIntroduction} value="go back to introduction"/>
        <DebugButton onClick={this.props.onSidebar} value="sidebar"/>

        <div className="flex justify-between pl-3 pr-3 pt-5 pb-5 ml-5 mr-5">
          <div className={ `user-progress flex items-center ${this.state.levelUp ? 'wobble-ver-right' : ''}`}>
            <Level progress={this.props.user.progress} level={this.props.user.level} />
            <AchievementIcon
              className="achievements fill-current w-8 h-8 text-white ml-5 mr-5 hover:text-blue-lightest cursor-pointer"
              onClick={this.props.onSidebar}
            />
          </div>

          <UserMenu user={this.props.user} />
        </div>
      </>
    );
  }
}

Header.propTypes = {
  onSidebar: PropTypes.func,
  user: PropTypes.object,
  updateUser: PropTypes.func
};

Header.defaultProps = {
  updateUser: () => {}
};

//@ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));