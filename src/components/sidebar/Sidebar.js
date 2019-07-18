import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import { auth } from '../../pages/login/Auth';
import Logo from '../logo/Logo';
import Achievements from '../achievement/Achievement';
import { track } from '../../emitter/Tracking';

import '../../scss/slide-in-bck-top.scss';
import '../../scss/fade-in-left.scss';
import '../../scss/fade-out-left.scss';

import './sidebar.scss';

export default class Sidebar extends Component {

  state = {
    open: false,
    hover: false,
    hideSidebarClass: 'hidden'
  }

  onSidebar = () => {
    const toggle = !this.state.open;

    this.setState({
      open: toggle,
      hideSidebarClass: 'fade-out-left'
    });

    track({
      section: 'sidebar',
      action: 'toggle_sidebar|button_click',
      value: toggle,
    });
  }

  onHover = () => {
    this.setState({
      //@ts-ignore
      ...this.state.hover, hover: true
    });
  }

  offHover = () => {
    this.setState({
      //@ts-ignore
      ...this.state.hover, hover: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={`sidebar bg-blue-dark h-screen z-50 overflow-y-auto absolute fade-in-left ${this.state.open ? 'block' : this.state.hideSidebarClass}`}
          style={{ width: '400px'}}
        >
          <Achievements onClose={this.onSidebar} />
        </div>
        <div className="header">
          {this.state.open && <div className="z-30 h-screen w-full absolute bg-testable-overlay-sidebar" onClick={this.onSidebar}></div>}
          { auth.isAuthenticated && <Header onSidebar={this.onSidebar} /> }
        </div>

        {this.props.children}

        <Logo
          className={`h-8 hidden md:block absolute pin-b pin-r mr-5 mb-5 ${this.state.hover ? 'pulsate-fwd': ''}` }
          onMouseEnter={this.onHover}
          onMouseLeave={this.offHover}
        />
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node
};