import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import Logo from '../logo/Logo';
import Achievements from '../achievement/Achievement';
import { track } from '../../emitter/Tracking';
import Loading from '../../components/loading/Loading';

import '../../scss/slide-in-bck-top.scss';
import '../../scss/fade-in-left.scss';
import '../../scss/fade-out-left.scss';

import './sidebar.scss';

const mapStateToProps = state => ({
  loading: state.loadingReducer.loading,
  user: state.userReducer.user,
});

export class Sidebar extends Component {

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
        {this.props.loading && <Loading />}

        <div
          className={`sidebar bg-blue-dark h-screen z-50 overflow-y-auto absolute fade-in-left ${this.state.open ? 'block' : this.state.hideSidebarClass}`}
          style={{ width: '400px'}}
        >
          <Achievements onClose={this.onSidebar} />
        </div>
        <div className="header">
          {this.state.open && <div className="z-30 h-screen w-full absolute bg-testable-overlay-sidebar" onClick={this.onSidebar}></div>}
          { this.props.user && <Header onSidebar={this.onSidebar} /> }
        </div>

        {this.props.children}

        { !this.props.user && <Logo
          className={`h-6 hidden md:block absolute pin-b pin-r mr-5 mb-5 ${this.state.hover ? 'pulsate-fwd': ''}` }
          onMouseEnter={this.onHover}
          onMouseLeave={this.offHover}
        /> }
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node
};

export default connect(mapStateToProps)(Sidebar);