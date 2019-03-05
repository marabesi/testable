import React, { Component } from 'react';
import Profile from '../../components/profile/Profile';
import Level from '../../components/level/Level';
import { Helmet } from 'react-helmet';
import SvgBuggy from '../../components/buggy/SvgBuggy';
import Editor from '../../components/editor/Editor';
import AnimatedText from '../../components/text-keyboard-animation/AnimatedText';

import './tutorial.scss'

export default class Tutorial extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      code: 'var = 1;',
      options: {
        mode: 'javascript',
        lineNumbers: false,
      },
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.location.state.user
    })
  }
  render() {
    return (
      <div className="map">
        <Helmet>
          <style>
            {`
              body {
                background-image: url("assets/bg.png");
                background-position: center center;
                height: 100vh;
              }
            `}
          </style>
        </Helmet>

        <div className="flex justify-between items-center h-16 p-3 bg-grey-darkest">
          <div className="user-info">
            <Profile user={this.state.user} />
          </div>

          <img src="assets/logo.png" className="h-8" alt="logotipo" />

          <div className="user-progress">
            <Level progress="10" level="1" />
          </div>
        </div>

        <div className="w-full flex mt-3">
          <div className="flex w-full justify-center bg-grey-darkest">
            <Editor value={this.state.code} options={this.state.options} />
            <Editor value={this.state.code} options={this.state.options} />
          </div>
        </div>
        <SvgBuggy className="w-1/5 absolute invisible" />

        <div className="flex justify-center bg-grey-darkest h-8"></div>

        <div className="flex justify-center">
          <AnimatedText
            className="w-2/3 text-white text-xl"
            text={[{ "line": "testi uahsuahsusahu as auauauau  ", "key": 0 }]}
          />
        </div>
      </div>
    );
  }
}