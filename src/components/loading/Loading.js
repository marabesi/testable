import React, { Component } from 'react';
import Background from '../../components/background/Background';

import './loading.scss';

export default class Loading extends Component {

  render() {
    return (
      <Background>
        <div className="absolute loading flex justify-center items-center" />
      </Background>
    );
  }
}