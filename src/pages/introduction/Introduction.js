import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import content from './introduction-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import Loading from '../../components/loading/Loading';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';
import { onLoading } from '../../actions/loadingAction';

const mapDispatchToProps = (dispatch) => {
  return {
    onLoading: loading => dispatch(onLoading(loading))
  };
};

export class Introduction extends Component {

  state = {
    redirect: false,
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
          pathname: '/tutorial',
        }} />
      );
    }

    return (
      <SceneManager
        identifier="introduction"
        content={content}
        handleLastScene={this.handleLastScene}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(Introduction);