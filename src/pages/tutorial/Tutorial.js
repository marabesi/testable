import React, { Component } from 'react';
import Profile from '../../components/profile/Profile';
import Level from '../../components/level/Level';
import { Helmet } from 'react-helmet';
import SvgBuggy from '../../components/buggy/SvgBuggy';
import Editor from '../../components/editor/Editor';
import AnimatedText from '../../components/text-keyboard-animation/AnimatedText';
import { Steps } from 'intro.js-react';
import { auth } from '../../pages/login/Auth';

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
      user: {},
      codeResult: '',
      code: 'var a = 1;',
      showNext: false,
      testCode: testCode,
      showTestCase: 'hidden',
      currentHint: 'Mas antes de começar vamos ver algumas coisas  .  .  . ',
      options: {
        mode: 'javascript',
        lineNumbers: true,
        theme: 'erlang-dark'
      },
      introEnabled: false,
      intro: {
        initialStep: 0,
        steps: [
          {
            element: '.user-info',
            intro: 'Aqui é onde mostramos sua foto e seu nome',
            position: 'right',
            tooltipClass: 'myTooltipClass',
            highlightClass: 'myHighlightClass',
          },
          {
            element: '.user-progress',
            intro: 'Acompanhe seu progresso nessa barra',
            tooltipClass: 'myTooltipClass',
          },
          {
            element: '.source-code',
            intro: 'Aqui é onde o código fonte é escrito',
            tooltipClass: 'myTooltipClass',
          },
          {
            element: '.source-code',
            intro: 'e é aqui que passaremos a maior parte da nossa jornada!',
            tooltipClass: 'last-step',
          },
        ],
      }
    };

    this.codeChanged = this.codeChanged.bind(this);
    this.onEnableTooltip = this.onEnableTooltip.bind(this);
    this.onFinishedTyping = this.onFinishedTyping.bind(this);
    this.onExit = this.onExit.bind(this);
  }

  onExit() {
    this.setState({
      ...this.state.introEnabled, introEnabled: false
    });
  }

  onEnableTooltip() {
    this.setState({
      ...this.state.introEnabled, introEnabled: true
    });
  }

  onFinishedTyping() {
    this.setState({
      ...this.state.showNext, showNext: true
    });
  }

  codeChanged(code) {
    try {
      this.setState({
        ...this.state.codeResult, codeResult: eval(code)
      });
    } catch (error) {
      this.setState({
        ...this.state.codeResult, codeResult: error.message
      });
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state.user, user: auth.user
    });
  }

  render() {
    return (
      <div className="map">
        <Helmet>
          <style>
            {`
              body {
                background: url("assets/bg-loading.png"), #012345;
                background-position: center center;
                height: 100vh;
              }
            `}
          </style>
        </Helmet>

        <Steps
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onExit}
          options={{
            disableInteraction: true,
            showStepNumbers: false,
            exitOnEsc: false,
            hidePrev: true,
            exitOnOverlayClick: false,
            showButtons: true,
            showBullets: false,
            showProgress: true,
          }}
        />

        <div className="flex justify-between pl-3 pr-3 mt-3">
          <div className="user-progress">
            <Level progress="50" level={this.state.user.level} />
          </div>

          <div className="user-info">
            <Profile user={this.state.user} />
          </div>
        </div>

        <div className="flex w-full justify-center relative">
          <img src="assets/logo.png" className="h-8 hidden lg:block" alt="logotipo" />
        </div>

        <div className="mt-5">
          <div className="flex justify-center">
            <Editor
              value={this.state.code}
              options={this.state.options}
              codeChanged={this.codeChanged}
              className="source-code m-5 border-2 border-testable-blue-overlay"
            />

            <Editor
              value={this.state.testCode}
              options={this.state.options}
              className={`test-code m-5 border-2 border-testable-blue-overlay ${this.state.showTestCase}`}
            />
          </div>

          <p className="m-auto mb-5 text-red font-medium" style={{ minWidth: '45%', maxWidth: '45%' }}>
            {this.state.codeResult}
          </p>
        </div>

        <div className="flex justify-center p-12 min-h-screen bg-testable-overlay">
          <div className="flex flex-col justify-start relative" style={{ minWidth: '45%', maxWidth: '45%' }}>
            <SvgBuggy className="absolute pin-t" style={{ transform: 'scaleX(-1)', width: '250px', marginTop: '-180px', marginLeft: '-270px' }} />
            <AnimatedText
              text={[{ 'line': this.state.currentHint, 'key': 0, 'style': 'text-white font-semibold text-xl' }]}
              onFinishedTyping={this.onFinishedTyping}
            />
            {this.state.showNext && <button onClick={this.onEnableTooltip} className="self-end no-underline text-white font-bold p-3">Proximo ></button>}
          </div>
        </div>
      </div>
    );
  }
}