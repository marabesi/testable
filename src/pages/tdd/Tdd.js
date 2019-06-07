import React, { Component } from 'react';
import Background from '../../components/background/Background';
import EditorManager from '../../components/editor-manager/EditorManager';
import tddContent from './tdd-content';
import Guide from '../../components/editor-manager/Guide';

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
    showNext: false,
    currentHint: 0,
  };

  constructor() {
    super();

    this.onValidCode = this.onValidCode.bind(this);
  }

  onValidCode(code, i) {
    let current = Object.assign({}, this.state.code);

    current[i] = code;

    this.setState({
      ...this.state.code, code: current
    });
  }

  render() {
    return (
      <Background>
        <div className="flex flex-col">
          <div className="flex justify-center">
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
            onFinishedTyping={this.onFinishedTyping}
          />
        </div>
      </Background>
    );
  }
}
