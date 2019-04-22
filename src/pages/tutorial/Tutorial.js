/* eslint no-eval: 0 */
import React, { Component } from 'react';
import SvgBuggy from '../../components/buggy/SvgBuggy';
import Editor from '../../components/editor/Editor';
import AnimatedText from '../../components/text-keyboard-animation/AnimatedText';
import TutorialSteps from './TutorialSteps';
import Background from '../../components/background/Background';
import Header from '../../components/header/Header';
import DebugButton from '../../components/debug/Button';
import intro from './intro';
import hints from './hints';

import 'intro.js/introjs.css';
import './tutorial.scss';

const esprima = require('esprima');
const testCode = `describe('comportamento', function() {
  it('deve somar um mais um', function() {

  })
})
`;

export default class Tutorial extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      codeResult: '',
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
    const total = this.state.hints.length;
    if (total === 2) {
      return;
    }

    this.setState({
      ...this.state.showNext, showNext: true
    });
  }

  async codeChanged(code) {
    try {
      const ast = esprima.parseScript(code);

      if (ast.type === 'Program') {
        for(let node in ast.body) {
          if (ast.body[node].type === 'FunctionDeclaration') {
            console.log('function');
          }

          if (ast.body[node].params.length === 2) {
            console.log('has two params');
          }

          if (ast.body[node].body.body[0].argument.operator === '+') {
            console.log('has +');
          }

        }
      }

      const result = eval(code);
      this.setState({
        ...this.state.codeResult, codeResult: result ? result.toString(): ''
      });
    } catch (error) {
      this.setState({
        ...this.state.codeResult, codeResult: error.message
      });
    }
  }

  handleProgress() {
    if (this.state.currentHint === 0) {
      this.onEnableTooltip();
    }
  }

  renderHint() {
    return this.state.hints.map((item, index) => {
      if (index === this.state.currentHint) {
        return <AnimatedText
          key={index}
          text={[
            item
          ]}
          onFinishedTyping={this.onFinishedTyping}
        />;
      }

      return false;
    });
  }

  render() {
    return (
      <Background>
        <TutorialSteps
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onFinishTooltip}
        />

        <Header />

        <DebugButton onClick={this.onEnableTooltip} value="enable introjs"/>
        <DebugButton onClick={this.onFinishTooltip} value="end introjs"/>

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

          <p className="m-auto mb-5 text-red font-medium" style={{ minWidth: '45%', maxWidth: '45%' }}>
            {this.state.codeResult}
          </p>
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
            {this.state.showNext && <button onClick={this.handleProgress} className="self-end no-underline text-white font-bold p-3">Proximo ></button>}
          </div>
        </div>
      </Background>
    );
  }
}