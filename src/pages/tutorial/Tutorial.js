/* eslint no-eval: 0 */
import React, { Component } from 'react';
import EditorManager from '../../components/editor-manager/EditorManager';
import tutorialContent from './tutorial-content';
import TutorialSteps from '../tutorial/TutorialSteps';
import intro from './intro';
import Guide from '../../components/editor-manager/Guide';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';
import Emitter, { LEVEL_UP, PROGRESS_UP } from '../../emitter/Emitter';
import { Redirect } from 'react-router';
import Reason from '../../engine/Reason';
import { Sum } from '../../engine/strategies/Sum';

import 'intro.js/introjs.css';
import './tutorial.scss';

export default class Tutorial extends Component {

  constructor() {
    super();

    this.state = {
      introEnabled: false,
      intro: intro,
      showNext: false,
      currentHint: 0,
    };

    this.onFinishTooltip = this.onFinishTooltip.bind(this);
    this.onEnableTooltip = this.onEnableTooltip.bind(this);
    this.onFinishedTyping = this.onFinishedTyping.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.nextHint = this.nextHint.bind(this);
    this.levelUp = this.levelUp.bind(this);
    this.onValidCode = this.onValidCode.bind(this);
  }

  onFinishTooltip() {
    this.setState({
      ...this.state.introEnabled, introEnabled: false,
      ...this.state.showNext, showNext: false,
      ...this.state.currentHint, currentHint: this.state.currentHint + 1
    });
  }

  onFinishedTyping() {
    const total = this.state.currentHint;
    if (total === 3) {
      return;
    }

    this.setState({
      ...this.state.showNext, showNext: true
    });
  }

  onEnableTooltip() {
    this.setState({
      ...this.state.introEnabled, introEnabled: true
    });
  }

  onValidCode(code) {
    // when it is not time to do the code yet and when
    // it is done with the sum and tries to add code again
    if (this.state.currentHint !== 3) {
      return;
    }

    if (Reason(code, Sum)) {
      Emitter.emit(LEVEL_UP);
      this.nextHint();
    }
  }

  nextHint() {
    const next = this.state.currentHint + 1;
    const total = tutorialContent.length;

    if (next < total) {
      Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });

      this.setState({
        ...this.state.currentHint, currentHint: next,
        ...this.state.showNext, showNext: false
      });

      return;
    }

    this.levelUp();

    auth.updateUserInfo({
      tutorial: false
    });

    setTimeout(() => {
      this.setState({
        tutorialDone: true
      });
    }, 1300);
  }

  levelUp() {
    Emitter.emit(LEVEL_UP);
  }

  handleProgress() {
    if (this.state.currentHint === 0) {
      this.onEnableTooltip();

      return;
    }

    this.nextHint();
  }

  render() {
    if (this.state.tutorialDone) {
      return (<Redirect to="/end" />);
    }

    return (
      <React.Fragment>
        <DebugButton onClick={this.onEnableTooltip} value="enable introjs" />
        <DebugButton onClick={this.nextHint} value="Forward" />
        <DebugButton onClick={this.levelUp} value="level up" />

        <TutorialSteps
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onFinishTooltip}
        />

        <EditorManager
          onEnableTooltip={this.onEnableTooltip}
          onFinishedTyping={this.onFinishedTyping}
          showNext={this.state.showNext}
          onValidCode={this.onValidCode}
        />

        <Guide
          guideContent={tutorialContent}
          showNext={this.state.showNext}
          handleProgress={this.handleProgress}
          currentHint={this.state.currentHint}
          onFinishedTyping={this.onFinishedTyping}
        />
      </React.Fragment>
    );
  }
}