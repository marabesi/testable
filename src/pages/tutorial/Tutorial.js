/* eslint no-eval: 0 */
import React, { Component } from 'react';
import SvgBuggy from '../../components/buggy/SvgBuggy';
import Editor from '../../components/editor/Editor';
import AnimatedText from '../../components/text-keyboard-animation/AnimatedText';
import TutorialSteps from './TutorialSteps';
import Background from '../../components/background/Background';
import DebugButton from '../../components/debug/Button';
import intro from './intro';
import hints from './hints';
import Reason from '../../engine/Reason';
import Sum from '../../engine/strategies/Sum';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';
import { Redirect } from 'react-router';
import { auth } from '../login/Auth';

import 'intro.js/introjs.css';
import './tutorial.scss';

const testCode = `describe('comportamento', function() {
  it('deve somar um mais um', function() {

  })
})
`;
export default class Tutorial extends Component {

  constructor() {
    super();
    this.state = {
      codeOutput: '',
      codeError: '',
      code: 'var a = 1;',
      showNext: false,
      testCode: testCode,
      showTestCase: 'hidden',
      currentHint: 0,
      hints: hints,
      introEnabled: false,
      intro: intro
    };

    this.codeChanged = this.codeChanged.bind(this);
    this.onEnableTooltip = this.onEnableTooltip.bind(this);
    this.onFinishedTyping = this.onFinishedTyping.bind(this);
    this.onFinishTooltip = this.onFinishTooltip.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.renderHint = this.renderHint.bind(this);
    this.nextHint = this.nextHint.bind(this);
    this.levelUp = this.levelUp.bind(this);
  }

  onFinishTooltip() {
    this.setState({
      ...this.state.introEnabled, introEnabled: false,
      ...this.state.showNext, showNext: false,
      ...this.state.currentHint, currentHint: this.state.currentHint + 1
    });
  }

  onEnableTooltip() {
    this.setState({
      ...this.state.introEnabled, introEnabled: true
    });
  }

  onFinishedTyping() {
    const total = this.state.currentHint;
    if (total === 1) {
      return;
    }

    this.setState({
      ...this.state.showNext, showNext: true
    });
  }

  codeChanged(code) {
    // when it is not time to do the code yet and when
    // it is done with the sum and tries to add code again
    if (this.state.currentHint < 1 || this.state.currentHint >= 2) {
      return;
    }

    try {
      this.setState({
        ...this.state.codeError, codeError: ''
      });

      const result = eval(code);
      const stringify = result ? result.toString(): '';

      this.setState({
        ...this.state.codeOutput, codeOutput: stringify
      });

      if (Reason(code, Sum)) {
        Emitter.emit(LEVEL_UP);
        this.nextHint();
      }
    } catch (error) {
      this.setState({
        ...this.state.codeError, codeError: error.message
      });
    }
  }

  nextHint() {
    const next = this.state.currentHint + 1;
    const total = hints.length;

    if (next < total) {
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

  renderHint() {
    return this.state.hints.map((item, index) => {
      if (index === this.state.currentHint) {
        return (
          <React.Fragment
            key={index}
          >
            <AnimatedText
              text={[
                item
              ]}
              onFinishedTyping={this.onFinishedTyping}
            />
            {this.state.showNext && <button onClick={this.handleProgress} className="self-end no-underline text-white font-bold p-3">Próximo ></button>}
          </React.Fragment>
        );
      }

      return false;
    });
  }

  render() {
    if (this.state.tutorialDone) {
      return (<Redirect to="/end" />);
    }

    return (
      <Background>
        <TutorialSteps
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onFinishTooltip}
        />

        <DebugButton onClick={this.onEnableTooltip} value="enable introjs"/>
        <DebugButton onClick={this.nextHint} value="Forward"/>
        <DebugButton onClick={this.levelUp} value="level up"/>

        <div className="mt-5">
          <div className="flex justify-center">
            <Editor
              value={this.state.code}
              codeChanged={this.codeChanged}
              className="source-code m-5 border-2 border-testable-blue-overlay"
            />

            <Editor
              value={this.state.testCode}
              className={`test-code m-5 border-2 border-testable-blue-overlay ${this.state.showTestCase}`}
            />
          </div>

          <div className="m-auto mb-5 bg-blue-dark" style={{ minWidth: '45%', maxWidth: '45%' }}>
            <p className="text-white">{this.state.codeOutput}</p>
            <p className="text-red font-medium">{this.state.codeError}</p>
          </div>
        </div>

        <div className="flex justify-center p-12 min-h-screen bg-testable-overlay">
          <div className="flex flex-col justify-start relative" style={{ minWidth: '45%', maxWidth: '45%' }}>
            <SvgBuggy
              className="absolute pin-t"
              style={{
                transform: 'scaleX(-1)',
                width: '250px',
                marginTop: '-180px',
                marginLeft: '-270px'
              }}
            />
            {this.renderHint()}
          </div>
        </div>
      </Background>
    );
  }
}