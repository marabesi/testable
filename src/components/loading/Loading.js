import React, { Component } from 'react';
import Background from '../../components/background/Background';
import './loading.scss';

export default class Loading extends Component {

  render() {
    return (
      <Background>
        <div className="absolute loading flex justify-center items-center">
          <h1 className="uppercase text-5xl text-white">
            Load<span style={{ color: '#04edf6' }}>ing</span>
          </h1>
        </div>
      </Background>
    );
  }
}