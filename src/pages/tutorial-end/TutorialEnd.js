import * as React from 'react';
import { Redirect } from 'react-router-dom';
import content from './tutorial-end-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import DebugButton from '../../components/debug/Button';
import { auth } from '../login/Auth';
import Emitter, {LEVEL_UP} from '../../emitter/Emitter';
import Loading from '../../components/loading/Loading.js';

export default class TutorialEnd extends React.Component {

  state = {
    redirect: false
  };

  handleLastScene = () => {
    Emitter.emit(LEVEL_UP);

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

  goToTutorial = () => {
    auth.updateUserInfo({
      tutorial: true,
      level: 2
    });
    window.location.reload();
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }

    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/tdd',
        }} />
      );
    }
    return (
      <React.Fragment>
        <DebugButton onClick={this.goToTutorial} value="tutorial" />
        <SceneManager
          identifier="post_tutorial"
          content={content}
          handleLastScene={this.handleLastScene}
        />
      </React.Fragment>
    );
  }
}
