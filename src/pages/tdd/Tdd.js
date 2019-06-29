import React, { Component } from 'react';
import EditorManager from '../../components/editor-manager/EditorManager';
import tddContent from './tdd-content';
import introContent from './intro-content';
import Intro from '../../components/intro/Intro';
import Guide from '../../components/editor-manager/Guide';
import Emitter, { PROGRESS_UP, LEVEL_UP } from '../../emitter/Emitter';
import { Redirect } from 'react-router';
import { track } from '../../emitter/Tracking';
import { auth } from '../../pages/login/Auth';
import DebugButton from '../../components/debug/Button';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
  var total = somar(1,2)
  var esperado = 3;
  return total === esperado;
}`;

export default class Tdd extends Component {

  state = {
    code: {
      0: code,
      1: test
    },
    done: false,

    showNext: false,
    currentHint: 0,
    initialStep: 0,
    introEnabled: false,
    intro: introContent,
  };

  componentDidMount() {
    track({
      section: 'tdd',
      action: 'tdd_start'
    });
  }

  onValidCode = (code, i) => {
    let current = Object.assign({}, this.state.code);

    current[i] = code;

    this.setState({
      ...this.state.code, code: current
    });
  }

  onGuideFinishedTyping = () => {
    this.setState({
      ...this.state.showNext, showNext: true
    });
  }

  handleProgress = () => {
    if (this.state.currentHint === 1) {
      this.toogleToolTip();
      track({
        section: 'tdd',
        action: 'next_guide_hint:started_unit_test_tooltip'
      });
      
      return;
    }
    
    const next = this.state.currentHint + 1;
    const total = tddContent.length;
    const isNotLast = next < total;

    if (isNotLast) {
      this.setState({
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

    Emitter.emit(LEVEL_UP);
    
    track({
      section: 'tdd',
      action: 'tdd_end',
      value: next
    });

    setTimeout(() => {
      this.setState({
        ...this.state.done, done: true
      });
    }, 700);
  }

  toogleToolTip = () => {
    this.setState({
      ...this.state.introEnabled, introEnabled: true
    });
  }

  onFinishTooltip = () => {
    this.setState({
      ...this.state.introEnabled, introEnabled: false,
      ...this.state.currentHint, currentHint: 1 + this.state.currentHint,
      ...this.state.showNext, showNext: false
    });
  }

  render() {
    if (this.state.done) {
      return (<Redirect to="/completed" />);
    }

    return (
      <React.Fragment>
        <DebugButton onClick={this.toogleToolTip} value="enable tooltip"/>

        <Intro
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onFinishTooltip}
        />

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
