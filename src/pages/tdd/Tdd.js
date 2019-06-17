import React, { Component } from 'react';
import EditorManager from '../../components/editor-manager/EditorManager';
import tddContent from './tdd-content';
import Guide from '../../components/editor-manager/Guide';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';
import { Redirect } from 'react-router';
import { track } from '../../emitter/Tracking';

const code = `function somar(a, b) {
  return a + b
}
`;

const test = `function testeSomarNumerosPositivos() {
  var total = somar(1,2)
  var esperado = 3;
  return total === esperado;
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
    done: false,
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
    const next = this.state.currentHint + 1;
    const total = tddContent.length;

    if (next < total) {
      this.setState({
        ...this.state.currentHint, currentHint: next,
        ...this.state.showNext, showNext: false
      });

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
      action: 'tdd_end'
    });

    this.setState({
      ...this.state.done, done: true
    });
  }

  render() {
    if (this.state.done) {
      return (<Redirect to="/completed" />);
    }

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}
