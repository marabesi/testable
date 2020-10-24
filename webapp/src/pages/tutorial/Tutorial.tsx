//@ts-nocheck
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import tutorialContent from './tutorial-content';
import introContent from './intro-content';
import EditorManager from '../../components/editor-manager/EditorManager';
import Intro from '../../components/intro/Intro';
import Guide from '../../components/guide/Guide';
import DebugButton from '../../components/debug/Button';
import Emitter, { LEVEL_UP, PROGRESS_UP } from '../../emitter/Emitter';
import Reason from '../../engine/Reason';
import { Sum } from '../../engine/strategies/behavior/Sum';
import { testCase as sumTestCase } from '../../engine/strategies/tester/Sum';
import { onHover } from '../../actions/guideAction';
import { updateUser } from '../../actions/userAction';
import { track } from '../../emitter/Tracking';
import { executeTestCase } from '../../engine/Tester';
import { SOURCE_CODE } from '../../constants/editor';

const mapStateToProps = (state: { userReducer: { user: any; }; }) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
  return {
    onHover: (hovered: boolean) => dispatch(onHover(hovered)),
    updateUser: (data: any) => dispatch(updateUser(data))
  };
};

const FIRST_STEP = 0;
const WAIT_FOR_CODE_ON_STEP = 3;

interface TutorialProps {
  tutorialContent: any[];
  onHover: Function;
  updateUser: Function;
  user: any;
};

interface TutorialState {
  tutorialDone: boolean;
  introEnabled: boolean;
  intro: any;
  showNext: boolean;
  currentHint: Number;
  code: string;
  editorOptions: any;
  editorError?: string;
  tutorialContent: any[];
};

export class Tutorial extends Component<TutorialProps, TutorialState> {

  state = {
    tutorialDone: false,
    introEnabled: false,
    intro: introContent,
    showNext: false,
    currentHint: 0,
    code: '// seu código javascript',
    editorOptions: {
      [SOURCE_CODE]: {
        className: '',
        readOnly: true
      }
    },
    editorError: '',
    tutorialContent: this.props.tutorialContent || tutorialContent
  };

  componentDidMount() {
    track({
      section: 'tutorial',
      action: 'tutorial_start'
    });
  }

  onFinishTooltip = () => {
    this.props.onHover(false);
    this.setState({
      introEnabled: false,
      showNext: false,
      currentHint: this.state.currentHint + 1
    });
    track({
      section: 'tutorial',
      action: 'interface_tour_end'
    });
  }

  onFinishedTyping = () => {
    const total = this.state.currentHint;
    if (total === WAIT_FOR_CODE_ON_STEP) {
      const currentState = Object.assign({}, this.state);
      currentState.editorOptions[SOURCE_CODE].className = 'attention';
      currentState.editorOptions[SOURCE_CODE].readOnly = false;
      this.setState(currentState);

      setTimeout(() => {
        const currentState = Object.assign({}, this.state);
        currentState.editorOptions[SOURCE_CODE].className = '';
        this.setState(currentState);
      }, 3000);

      return;
    }

    this.setState({ showNext: true });
  }

  onEnableTooltip = () => {
    this.setState({ introEnabled: true });
    this.props.onHover(true);

    track({
      section: 'tutorial',
      action: 'interface_tour_start'
    });
  }

  onValidCode = (code: string) => {
    // when it is not time to do the code yet and when
    // it is done with the sum and tries to add code again
    if (this.state.currentHint !== WAIT_FOR_CODE_ON_STEP) {
      return;
    }

    const strategyResult = Reason(code, Sum);

    if (strategyResult && executeTestCase(code, strategyResult, sumTestCase)) {
      track({
        section: 'tutorial',
        action: 'sum:valid_code',
        value: code
      });
      this.nextHint();
    }
  }

  onErrorCode = (error: string) => {
    this.setState({ editorError: error });
  }

  nextHint = () => {
    const next = this.state.currentHint + 1;
    const total = this.state.tutorialContent.length;

    if (next < total) {
      Emitter.emit(PROGRESS_UP, { amount: this.props.user.progress + 10 });

      this.setState({
        currentHint: next,
        showNext: false
      });

      track({
        section: 'tutorial',
        action: 'next_guide_hint:button_click',
        value: next
      });

      return;
    }

    Emitter.emit(LEVEL_UP);

    this.props.updateUser({ tutorial: false });

    track({
      section: 'tutorial',
      action: 'tutorial_end'
    });

    this.setState({ tutorialDone: true });
  }

  handleProgress = () => {
    if (this.state.currentHint === FIRST_STEP) {
      this.onEnableTooltip();
      return;
    }

    this.nextHint();
  }

  render() {
    if (this.state.tutorialDone) {
      return (<Redirect to="/tutorial-end" />);
    }

    return (
      <>
        <DebugButton onClick={this.onEnableTooltip} value="enable introjs" />
        <DebugButton onClick={this.nextHint} value="Forward" />

        <Intro
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onFinishTooltip}
        />

        <EditorManager
          className="w-full p-2 md:w-1/2 md:p-0 m-auto"
          onEnableTooltip={this.onEnableTooltip}
          onValidCode={{ [SOURCE_CODE]: this.onValidCode} }
          onErrorCode={{ [SOURCE_CODE]: this.onErrorCode }}
          code={{ [SOURCE_CODE]: this.state.code} }
          options={ this.state.editorOptions }
        />

        <Guide
          guideContent={this.state.tutorialContent}
          showNext={this.state.showNext}
          handleProgress={this.handleProgress}
          currentHint={this.state.currentHint}
          onFinishedTyping={this.onFinishedTyping}
          invalidCode={this.state.editorError}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
