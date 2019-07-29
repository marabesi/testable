import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import content from './completed-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import Loading from '../../components/loading/Loading';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

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
    }, 1000);
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }

    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/survey',
        }} />
      );
    }

    return (
      <SceneManager
        identifier="completed"
        content={content}
        handleLastScene={this.handleLastScene}
      />
    );
  }
}
