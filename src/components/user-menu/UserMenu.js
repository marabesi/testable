import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from '../profile/Profile';
import Cup from '../icons/Cup';
import Achievement from '../icons/Achievement';
import { auth } from '../../pages/login/Auth';

export default class UserMenu extends Component {

  render() {
    return (
      <div className="flex justify-end items-center">
        <Cup className="fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer" />
        <Achievement
          className="fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer"
          onClick={this.props.onNotification}
        />
        <Profile user={auth.user} />
      </div>
    );
  }
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onNotification: PropTypes.func
};
