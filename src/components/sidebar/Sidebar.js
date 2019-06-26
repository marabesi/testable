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
        title: 'Desafio aceito 1 !',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl',
        active: false
      },
      {
        title: 'Desafio aceito 2!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl',
        active: false
      },
      {
        title: 'Desafio aceito 3!',
        description: 'bla bla blab lablab asudh aiushd iuahsd iuahsd iuashd iuahsdiuhasiduhaisudh iuasdh iuashd iuashd iuashd iuashdhausdhuahsuduhasd asdlabl',
        active: false
      },
      {
        title: 'Desafio aceito 4!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl',
        active: false
      },
      {
        title: 'Desafio aceito 5!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl',
        active: false
      },
      {
        title: 'Desafio aceito 6!',
        description: 'bla bla blab lablab asudh hausdhuahsuduhasd asdlabl',
        active: false
      }
    ]
  }

  onSidebar = () => {
    const toggle = !this.state.open;
    this.setState({
      open: toggle
    });
  }

  showAchievement = (index) => {
    const current = this.state.achievements;
    const selected = current[index];

    selected.active = !selected.active;

    current[index] = selected;

    this.setState({
      ...this.state.achievements, current
    });
  }

  render() {
    const achievements = [];

    for (const [index, achievement] of this.state.achievements.entries()) {
      achievements.push(
        <li key={index} className="p-2">
          <ul>
            <h3 className="hover:underline cursor-pointer" onClick={() => this.showAchievement(index)}>
              { achievement.title }
            </h3>
            <li className={`${achievement.active ? '': 'hidden'}`}>
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
          <h1 className="uppercase flex justify-between text-blue-lightest p-5 h-16">
            Conquistas
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="fill-current w-4 text-white cursor-pointer" onClick={this.onSidebar} viewBox="0 0 21.9 21.9" enableBackground="new 0 0 21.9 21.9">
              <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z" />
            </svg>
          </h1>

          <ul className="p-2 text-white">
            { achievements }
          </ul>
        </div>
        <div className="header">
          {this.state.open && <div className="z-30 h-screen w-full absolute bg-testable-overlay-sidebar" onClick={this.onSidebar}></div>}
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