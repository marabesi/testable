import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Scene from './Scene';

import './tutorial.scss';

export default class Tutorial extends Component {

  render() {
    return (
      <div className="tutorial flex">
        <Helmet>
          <style>{'body { background-color: #520F87; }'}</style>
        </Helmet>

        <Scene text="first step" button="Ok" step="1" className="m-auto w-4/5"/>
      </div>
    );
  }
}