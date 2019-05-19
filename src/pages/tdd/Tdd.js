import React, { Component } from 'react';
import Background from '../../components/background/Background';
import EditorManager from '../../components/editor-manager/EditorManager';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
  
}`;

export default class Tdd extends Component {

  state = {
    code: code,
    testCode: test
  };

  onValidCode(code) {
  }

  onTestCodeChanged(code) {
  }

  render() {
    return (
      <Background>
        <div className="flex justify-center">
          <EditorManager
            className="w-2/5"
            onValidCode={this.onValidCode}
            code={this.state.code}
          />
          <EditorManager
            className="w-2/5 m-5"
            onValidCode={this.onTestCodeChanged}
            code={this.state.testCode}
          />
        </div>
      </Background>
    );
  }
}
