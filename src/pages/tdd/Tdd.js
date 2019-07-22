import React, { Component } from 'react';
import { Redirect } from 'react-router';
import tddContent from './guide-content';
import EditorManager from '../../components/editor-manager/EditorManager';
import Guide from '../../components/editor-manager/Guide';
import Emitter, { PROGRESS_UP, LEVEL_UP } from '../../emitter/Emitter';
import { track } from '../../emitter/Tracking';
import { auth } from '../login/Auth';
import Loading from '../../components/loading/Loading';
import { SumBehavior } from '../../engine/strategies/behavior/SumBehavior';
import Reason from '../../engine/Reason';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
}`;

export default class Tdd extends Component {

  state = {
    code: {
      0: code,
      1: test
    },
    done: false,
    currentExercise: 0,
    showNext: false,
    currentHint: 0,
    initialStep: 0,
    introEnabled: false,
    loading: false,
  };

  componentDidMount() {
    track({
      section: 'tdd',
      action: 'tdd_start'
    });
  }

  onValidCode = (code, i) => {
    if (this.state.currentHint !== 1) {
      return;
    }

    let current = Object.assign({}, this.state.code);

    current[i] = code;

    this.setState({
      ...this.state.code, code: current
    });

    if (Reason(code, SumBehavior)) {
      Emitter.emit(LEVEL_UP);

      track({
        section: 'tdd',
        action: 'tdd:valid_code',
        value: code
      });

      this.setState({
        //@ts-ignore
        ...this.state.currentHint, currentHint: this.state.currentHint + 1,
        ...this.state.showNext, showNext: false
      });
    }
  }

  onGuideFinishedTyping = () => {
    if (this.state.currentHint === 1) {
      return;
    }

    this.setState({
      //@ts-ignore
      ...this.state.showNext, showNext: true
    });
  }

  handleProgress = () => {
    const next = this.state.currentHint + 1;
    const total = tddContent.length;
    const isNotLast = next < total;

    if (isNotLast) {
      this.setState({
        //@ts-ignore
        ...this.state.currentHint, currentHint: next,
        ...this.state.showNext, showNext: false
      });

      Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });

      track({
        section: 'tdd',
        action: 'next_guide_hint:button_click',
        value: next
      });

      return;
    }

    setTimeout(() => {
      this.setState({
        //@ts-ignore
        ...this.state.loading, loading: false,
        ...this.state.done, done: true
      });
    }, 700);
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }

    if (this.state.done) {
      return (<Redirect to="/completed" />);
    }

    return (
      <React.Fragment>
        <div className="flex flex-col">
          <div className="flex justify-center editor-container">
            <EditorManager
              editor={2}
              className="w-2/5 m-5"
              code={this.state.code}
              onValidCode={{ 0: this.onValidCode, 1: this.onValidCode }}
            />
          </div>

          <Guide
            guideContent={tddContent}
            showNext={this.state.showNext}
            handleProgress={this.handleProgress}
            currentHint={this.state.currentHint}
            onFinishedTyping={this.onGuideFinishedTyping}
          />
        </div>
      </React.Fragment>
    );
  }
}
