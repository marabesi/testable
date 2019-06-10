import React, { Component } from 'react';
import SceneManager from '../../components/scene-manager/SceneManager';
import Loading from '../../components/loading/Loading';
import { Redirect } from 'react-router-dom';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';
import content from './introduction-content.json';
import Background from '../../components/background/Background';

export default class Introduction extends Component {

  state = {
    redirect: false,
    loading: false,
  };

  handleLastScene = () => {
    Emitter.emit(LEVEL_UP, {
      tutorial: true,
    });

    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        redirect: true
      });
    }, 2000);
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }

    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/tutorial',
        }} />
      );
    }

    return (
      <Background>
        <SceneManager
          content={content}
          handleLastScene={this.handleLastScene}
        />
      </Background>
    );
  }
}
