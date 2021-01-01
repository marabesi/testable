//@ts-nocheck
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import Achievements from '../achievement';
import Logo from '../../images/logo/Logo';
import { track } from '../../../../emitter/Tracking';

import '../../../../scss/fade-in-left.scss';
import '../../../../scss/fade-out-left.scss';

import './sidebar.scss';

const mapStateToProps = state => ({
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

  render() {
    return (
      <>
        <div
          className={`sidebar bg-blue-dark h-screen z-50 overflow-y-auto absolute fade-in-left ${this.state.open ? 'block' : this.state.hideSidebarClass}`}
          style={{ width: '300px'}}
        >
          <Achievements onClose={this.onSidebar} />
        </div>
        <div className="header">
          {this.state.open && <div className="z-30 h-screen w-full absolute bg-testable-overlay-sidebar" onClick={this.onSidebar}></div>}
          { this.props.user.uid && <Header onSidebar={this.onSidebar} /> }
        </div>

        {this.props.children}

        { !this.props.user.uid && <Logo
          className="h-6 hidden md:block absolute pin-b pin-r mr-5 mb-5"
        /> }
      </>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
};

Sidebar.defaultProps = {
  user: {}
};

export default connect(mapStateToProps)(Sidebar);
