import React, { Component } from 'react';
import Header from '../header/Header';
import { auth } from '../../pages/login/Auth';
import PropTypes from 'prop-types';

import '../../scss/fade-in-left.scss';
import '../../scss/fade-out-left.scss';

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
          className={`sidebar bg-blue-dark h-screen z-50 absolute fade-in-left ${this.state.open ? 'block' : 'hidden'}`}
          style={{ width: '400px'}}
        >
          <h1 className="uppercase text-center m-auto text-blue-lightest p-2">Conquistas</h1>

          <ul className="p-2 text-white">
            <li>ashdoiasjoiasdhioasd asdaosdoahsdoashodashdoa sda diahosd</li>
          </ul>
        </div>
        <div className="header">
          {this.state.open && <div className="z-30 h-screen w-full absolute bg-testable-overlay" onClick={this.onSidebar}></div>}
          { auth.isAuthenticated && <Header onSidebar={this.onSidebar} /> }
        </div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node
};