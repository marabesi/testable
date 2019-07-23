import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from '../profile/Profile';
import Modal from '../modal/Modal';
import Cup from '../icons/Cup';
import Achievement from '../icons/Achievement';
import { auth } from '../../pages/login/Auth';
import Title from '../title/Title';
import Close from '../icons/Close';

export default class UserMenu extends Component {

  state = {
    ranking: false
  };

  onRanking = () => {
    this.setState({
      // @ts-ignore
      ...this.state.ranking, ranking: !this.state.ranking
    });
  }

  render() {
    return (
      <div className="flex justify-end items-center">
        <Cup
          className="fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer"
          onClick={this.onRanking}
        />
        <Achievement
          className="fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer"
          onClick={this.props.onNotification}
        />
        <Profile user={auth.user} />
        <Modal
          isOpen={this.state.ranking}
          onRequestClose={this.onRanking}
        >
          <Title>
            Ranking
            <Close className="fill-current w-4 text-white cursor-pointer" onClick={this.onRanking} />
          </Title>
        </Modal>
      </div>
    );
  }
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onNotification: PropTypes.func
};
