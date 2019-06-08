import React, { Component } from 'react';
import Background from '../../components/background/Background';
import EditorManager from '../../components/editor-manager/EditorManager';
import tddContent from './tdd-content';
import Guide from '../../components/editor-manager/Guide';

const code = `function somar(a, b) {
  return a + b
}
`;

const test = `function testeSomarNumerosPositivos() {
  var total = somar(1,2)
  
  return total === 3;
}
`;

export default class Tdd extends Component {

  state = {
    code: {
      0: code,
      1: test
    },
    showNext: false,
    currentHint: 0,
  };

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
    const next = this.state.currentHint + 1;
    const total = tddContent.length;

    if (next < total) {
      this.setState({
        ...this.state.currentHint, currentHint: next,
        ...this.state.showNext, showNext: false
      });

      return;
    }
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
            onFinishedTyping={this.onGuideFinishedTyping}
          />
        </div>
      </Background>
    );
  }
}
