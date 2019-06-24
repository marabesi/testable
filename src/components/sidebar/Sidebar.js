import React, { Component } from 'react';
import Header from '../header/Header';
import { auth } from '../../pages/login/Auth';
import PropTypes from 'prop-types';
import Logo from '../logo/Logo';

import '../../scss/fade-in-left.scss';
import '../../scss/fade-out-left.scss';

import './sidebar.scss';

export default class Sidebar extends Component {

  state = {
    open: false,
    achievements: [
      {
        title: 'Desafio aceito!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl'
      },
      {
        title: 'Desafio aceito!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl'
      },
      {
        title: 'Desafio aceito!',
        description: 'bla bla blab lablab asudh aiushd iuahsd iuahsd iuashd iuahsdiuhasiduhaisudh iuasdh iuashd iuashd iuashd iuashdhausdhuahsuduhasd asdlabl'
      },
      {
        title: 'Desafio aceito!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl'
      },
      {
        title: 'Desafio aceito!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl'
      },
      {
        title: 'Desafio aceito!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl'
      }
    ]
  }

  onSidebar = () => {
    const toggle = !this.state.open;
    this.setState({
      open: toggle
    });
  }

  render() {
    const achievements = [];

    for (const [index, achievement] of this.state.achievements.entries()) {
      achievements.push(
        <li key={index} className="p-2">
          <ul>
            <h3>{ achievement.title }</h3>
            <li>
              <span>{ achievement.description }</span>
            </li>
          </ul>
        </li>
      );
    }

    return (
      <React.Fragment>
        <div
          className={`sidebar bg-blue-dark h-screen z-50 overflow-y-auto absolute fade-in-left ${this.state.open ? 'block' : 'hidden'}`}
          style={{ width: '400px'}}
        >
          <h1 className="uppercase text-center m-auto text-blue-lightest p-2">
            Conquistas
          </h1>

          <ul className="p-2 text-white">
            { achievements }
          </ul>
        </div>
        <div className="header">
          {this.state.open && <div className="z-30 h-screen w-full absolute bg-testable-overlay" onClick={this.onSidebar}></div>}
          { auth.isAuthenticated && <Header onSidebar={this.onSidebar} /> }
        </div>

        {this.props.children}

        <Logo className="h-8 hidden md:block absolute pin-b pin-r mr-5 mb-5" />
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node
};