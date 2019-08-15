import * as React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PlaceholderImage from './PlaceholderImage';
import { auth } from '../../pages/login/Auth';
import { track } from '../../emitter/Tracking';

import './profile.scss';
import Modal from '../modal/Modal';

export default class Profile extends React.Component {

  state = {
    menu: false,
    successfulLoggedOut: false,
    photo: '',
    modal: false
  }

  onLogout = () => {
    auth.signout(() => {
      this.setState({
        successfulLoggedOut: true,
        menu: false
      });

      track({
        section: 'profile',
        action: 'logout'
      });
    });
  }

  showMenu = () => {
    track({
      section: 'profile',
      action: 'show_menu|button_click'
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
          this.setState({
            //@ts-ignore
            ...this.state.photo, photo
          });
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
      <React.Fragment>
        {
          this.state.modal &&
          <Modal
            title="Opções"
            isOpen={this.state.modal}
            onClose={this.onOptions}
          >
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
            <ul className={`w-full bg-testable-overlay list-reset p-1 z-40 options absolute ${this.state.menu ? 'block' : 'hidden'}`}>
              <li className="cursor-pointer text-white text-center p-2 hover:text-blue-lightest" onClick={this.onOptions}>Opções</li>
              <li className="cursor-pointer text-white text-center p-2 hover:text-blue-lightest" onClick={this.onLogout}>Logout</li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string
};
