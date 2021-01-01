//@ts-nocheck
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Options from '../options/Options';
import PlaceholderImage from '../../../images/profile/PlaceholderImage';
import Modal from '../../modal/Modal';
import { auth } from '../../../../../pages/login/Auth';
import { track } from '../../../../../emitter/Tracking';
import { setUser } from '../../../../../actions/userAction';

import './profile.scss';

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  };
};

export class Profile extends Component {

  state = {
    menu: false,
    successfulLoggedOut: false,
    photo: '',
    modal: false
  }

  onLogout = () => {
    auth.signout();
    this.props.setUser({});

    this.setState({
      successfulLoggedOut: true,
      menu: false
    });

    track({
      section: 'profile',
      action: 'logout'
    });
  }

  showMenu = () => {
    track({
      section: 'profile',
      action: 'toggle_menu|button_click'
    });

    this.setState({
      menu: !this.state.menu
    });
  }

  onBlur = () => {
    this.setState({
      menu: false
    });
  }

  componentDidMount = () => {
    const { photo } = this.props.user;

    if (photo) {
      fetch(photo)
        .then(response => response.blob())
        .then(image => {
          const photo = URL.createObjectURL(image);
          this.setState({ photo });
        });
    }
  }

  renderUserPhoto() {
    if (this.state.photo) {
      return (<img src={this.state.photo} alt="" />);
    }

    return (<PlaceholderImage />);
  }

  onOptions = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    if (this.state.successfulLoggedOut) {
      return (
        <Redirect to={{
          pathname: '/'
        }} />
      );
    }

    const { name, email } = this.props.user;
    const propClass = this.props.className;

    const className = `profile flex cursor-pointer group ${
      propClass ? propClass : ''
    }`;

    return (
      <>
        {
          this.state.modal &&
          <Modal
            title={<span>{this.props.intl.messages.global.options}</span>}
            isOpen={this.state.modal}
            onClose={this.onOptions}
          >
            <Options />
          </Modal>
        }
        <div
          className="relative outline-none user-info"
          tabIndex={0}
          onBlur={this.onBlur}
          title={`${name} - ${email}`}
        >
          <div className={className} onClick={this.showMenu}>
            <div className="picture-holder group-hover:border-blue-lightest">
              {this.renderUserPhoto()}
            </div>
            <div className="info">
              <h2 className="title text-white text-base uppercase font-medium truncate group-hover:text-blue-lightest" title={name}>
                {name}
              </h2>
            </div>
            <ul className={`w-full bg-testable-overlay list-reset p-1 z-40 options absolute pin-t ${this.state.menu ? 'block' : 'hidden'}`}>
              <li className="capitalize cursor-pointer text-white text-center p-2 hover:text-blue-lightest" onClick={this.onOptions}>
                { this.props.intl.messages.global.options }
              </li>
              <li className="capitalize cursor-pointer text-white text-center p-2 hover:text-blue-lightest" onClick={this.onLogout}>
                { this.props.intl.messages.menu.logout }
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string,
  intl: PropTypes.object,
  setUser: PropTypes.func
};

Profile.defaultProps = {
  intl: {
    messages: {
      global: {},
      menu: {}
    }
  }
};

export default injectIntl(connect(null, mapDispatchToProps)(Profile));