//@ts-nocheck
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Emitter, { PROGRESS_UP, LEVEL_UP } from '../../packages/emitter/Emitter';
import { track } from '../../packages/emitter/Tracking';
import { auth } from '../../pages/login/Auth';
import Reason from '../../packages/engine/Reason';
import EditorManager from '../ui/interface/editor-manager/EditorManager';
import Guide from '../ui/interface/guide/Guide';
import Intro from '../ui/interface/intro/Intro';
import DebugButton from '../ui/buttons/debug/Debug';
import {SOURCE_CODE, TEST_CODE} from '../ui/interface/editor-manager/constants';
import {executeTestCase} from '../../packages/engine/Tester';

/**
 * 
 * @param {string} code the code (raw code: function myCode() {})
 * @param {string} test the test code (raw test code: function test() {})
 * @param {array} testCaseTests an array of objects with tests cases to be executed examples at src/engine/strategies/tester
 * @param {*} sourceCodeTests 
 * @param {*} guideContent 
 * @param {*} whenDoneRedirectTo 
 * @param {*} waitCodeToBeExecutedOnStep 
 * @param {*} enableEditorOnStep 
 * @param {*} trackSection 
 * @param {*} testCaseStrategy 
 * @param {*} sourceCodeStrategy 
 * @param {*} disableEditor 
 * @param {*} introContent 
 * @param {*} enableIntroOnStep 
 * @param {*} editorOptions 
 * @param {*} attentionAnimationTo 
 */
const Wrapped = (
  code,
  test,
  testCaseTests,
  sourceCodeTests,
  guideContent,
  whenDoneRedirectTo,
  waitCodeToBeExecutedOnStep,
  enableEditorOnStep,
  trackSection,

  testCaseStrategy,
  sourceCodeStrategy,

  disableEditor,
  introContent,
  enableIntroOnStep,
  editorOptions,
  attentionAnimationTo = []
) => {
  class Rocket extends Component {

    state = {
      code: {
        [SOURCE_CODE]: code,
        [TEST_CODE]: test
      },
      editorOptions: editorOptions || {
        [SOURCE_CODE]: {
          readOnly: true
        },
        [TEST_CODE]: {}
      },
      done: false,
      showNext: false,
      currentHint: 0,
      initialStep: 0,
      introEnabled: false,
      intro: introContent || {
        steps: [],
        initialStep: 0
      },
      editorError: false,
    };

    componentDidMount() {
      track({
        section: trackSection,
        action: `${trackSection}_start`
      });
    }

    onValidCode = (code, i) => {
      if (this.state.currentHint !== enableEditorOnStep || i === disableEditor) {
        return;
      }

      let current = Object.assign({}, this.state.code);

      current[i] = code;

      this.setState({ code: current });

      const codeAndTestCase = `${this.state.code[SOURCE_CODE]} ${this.state.code[TEST_CODE]}`;

      const sourceCodeStrategyResult = Reason(this.state.code[SOURCE_CODE], sourceCodeStrategy);
      const sourceCodeExecution = sourceCodeStrategyResult && executeTestCase(this.state.code[SOURCE_CODE], sourceCodeStrategyResult, sourceCodeTests);

      const testCaseStrategyResult = Reason(this.state.code[TEST_CODE], testCaseStrategy);
      const testCaseExecutionResult = testCaseStrategyResult && executeTestCase(codeAndTestCase, testCaseStrategyResult, testCaseTests);

      if (testCaseExecutionResult && sourceCodeExecution) {
        track({
          section: trackSection,
          action: `${trackSection}:valid_code`
        });

        this.setState({
          currentHint: this.state.currentHint + 1,
          showNext: false
        });
      }
    }

    onErrorCode = (error) => {
      this.setState({ editorError: error });
    }

    onGuideFinishedTyping = () => {
      if (this.state.currentHint === waitCodeToBeExecutedOnStep) {
        const currentState = Object.assign({}, this.state);
        attentionAnimationTo.forEach(editor => {
          currentState.editorOptions[editor].className = 'attention';
        });
        this.setState(currentState);

        setTimeout(() => {
          const currentState = Object.assign({}, this.state);
          attentionAnimationTo.forEach(editor => {
            currentState.editorOptions[editor].className = '';
          });
          this.setState(currentState);
        }, 3000);
        return;
      }

      this.setState({ showNext: true });
    };

    handleProgress = () => {
      if (this.state.currentHint === enableIntroOnStep) {
        this.toogleToolTip();
        track({
          section: trackSection,
          action: `next_guide_hint:started_tooltip_${trackSection}`
        });

        return;
      }

      const next = this.state.currentHint + 1;
      const total = guideContent.length;
      const isNotLast = next < total;

      if (isNotLast) {
        this.setState({
          currentHint: next,
          showNext: false
        });

        Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });

        track({
          section: trackSection,
          action: 'next_guide_hint:button_click',
          value: next
        });

        return;
      }

      Emitter.emit(LEVEL_UP);

      this.setState({ done: true });
    }

    previousStep = () => {
      this.setState({ currentHint: this.state.currentHint - 1 });
    }

    toogleToolTip = () => {
      this.setState({ introEnabled: true });
    }

    onFinishTooltip = () => {
      if (this.state.currentHint !== enableIntroOnStep) {
        return;
      }

      this.setState({
        introEnabled: false,
        currentHint: 1 + this.state.currentHint,
        showNext: false
      });
    }

    render() {
      if (this.state.done) {
        return (<Redirect to={whenDoneRedirectTo} />);
      }

      return (
        <div className="flex flex-col">
          <Intro
            enabled={this.state.introEnabled}
            steps={this.state.intro.steps}
            initialStep={this.state.intro.initialStep}
            onExit={this.onFinishTooltip}
          />

          <div className="flex justify-center editor-container">
            <DebugButton onClick={this.previousStep} value="previous" />
            <EditorManager
              editor={2}
              className="min-w-testable-editor max-w-testable-editor m-1 md:m-5"
              code={this.state.code}
              onValidCode={{ [SOURCE_CODE]: this.onValidCode, [TEST_CODE]: this.onValidCode }}
              onErrorCode={{ [SOURCE_CODE]: this.onErrorCode, [TEST_CODE]: this.onErrorCode }}
              options={ this.state.editorOptions }
            />
            <DebugButton onClick={this.handleProgress} value="next" />
          </div>

          <Guide
            guideContent={guideContent}
            showNext={this.state.showNext}
            handleProgress={this.handleProgress}
            currentHint={this.state.currentHint}
            onFinishedTyping={this.onGuideFinishedTyping}
            invalidCode={this.state.editorError}
          />
        </div>
      );
    }
  }
  return Rocket;
};

Wrapped.propTypes = {
  whenDoneRedirectTo: PropTypes.string,
};

export default Wrapped;