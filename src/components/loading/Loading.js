import React, { Component } from 'react';
import Background from '../../components/background/Background';
import Load from '../icons/load/Load';

export default class Loading extends Component {

  render() {
    return (
      <Background>
        <Load />
      </Background>
    );
  }
}