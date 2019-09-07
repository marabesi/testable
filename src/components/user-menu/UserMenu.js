import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from '../profile/Profile';
import Modal from '../modal/Modal';
import Cup from '../icons/Cup';
import Ranking from '../ranking/Ranking';
import AchievementIcon from '../icons/Achievement';
import { auth } from '../../pages/login/Auth';
import {track} from '../../emitter/Tracking';

export default class UserMenu extends Component {

  state = {
    ranking: false
  };

  onRanking = () => {
    this.setState({
      // @ts-ignore
      ...this.state.ranking, ranking: !this.state.ranking
    });
    track({
      section: 'user_menu',
      action: 'toggle_ranking|button_click'
    });
  }

  render() {
    return (
      <div className="flex justify-end items-center">
        <Cup
          className="fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer"
          onClick={this.onRanking}
        />
        <AchievementIcon
          className="fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer"
          onClick={this.props.onNotification}
        />
        <Profile user={auth.user} />
        <Modal
          title={'Ranking'}
          isOpen={this.state.ranking}
          onClose={this.onRanking}
        >
          <Ranking onClick={this.onRanking} />
        </Modal>
      </div>
    );
  }
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onNotification: PropTypes.func
};
