import React, { Component } from 'react';
import Header from '../header/Header';
import { auth } from '../../pages/login/Auth';
import PropTypes from 'prop-types';

import './sidebar.scss';

export default class Sidebar extends Component {

  state = {
    open: false
  }

  onSidebar = () => {
    const toggle = !this.state.open;
    this.setState({
      open: toggle
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={`bg-white h-screen z-50 absolute fade-in-left ${this.state.open ? 'block' : 'hidden'}`}
          style={{ width: '400px'}}
        >
        </div>
        {this.state.open && <div className="z-30 h-screen w-full absolute bg-testable-overlay" onClick={this.onSidebar}></div>}
        { auth.isAuthenticated && <Header onSidebar={this.onSidebar} /> }
        {this.props.children}
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node
};