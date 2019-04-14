import React, { Component } from 'react';
import Profile from '../../components/profile/Profile';
import Level from '../../components/level/Level';
import { Helmet } from 'react-helmet';
import SvgBuggy from '../../components/buggy/SvgBuggy';
import Editor from '../../components/editor/Editor';
import AnimatedText from '../../components/text-keyboard-animation/AnimatedText';
import { Steps } from 'intro.js-react';
import { fakeAuth } from '../../pages/login/Auth';

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
      testCode: testCode,
      showTestCase: 'hidden',
      currentHint: 'my text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centurie',
      options: {
        mode: 'javascript',
        lineNumbers: true,
        theme: 'erlang-dark'
      },
      intro: {
        introEnabled: false,
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
            intro: 'Aqui é onde o código fonte é escrito',
            tooltipClass: 'last-step',
          },
        ],
      }
    };

    this.codeChanged = this.codeChanged.bind(this);
  }

  onExit() {

  }

  codeChanged(code) {
    setTimeout(() => {
      try {
        this.setState({
          ...this.state.codeResult, codeResult: eval(code)
        });
      } catch (error) {
        this.setState({
          ...this.state.codeResult, codeResult: error.message
        });
      }
    }, 600);
  }

  componentDidMount() {
    this.setState({
      ...this.state.user, user: fakeAuth.user
    });
  }

  render() {
    return (
      <div className="map">
        <Helmet>
          <style>
            {`
              body {
                background-image: url("assets/bg.png");
                background-position: center center;
                height: 100vh;
              }
            `}
          </style>
        </Helmet>

        <Steps
          enabled={this.state.intro.introEnabled}
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
            <Level progress="10" level={this.state.user.level} />
          </div>

          <div className="user-info">
            <Profile user={this.state.user} />
          </div>
        </div>

        <div class="flex w-full justify-center relative">
          <img src="assets/logo.png" className="h-8 hidden lg:block" alt="logotipo" />
        </div>

        <div className="mt-5">
          <div className="flex justify-center">
            <Editor
              value={this.state.code}
              options={this.state.options}
              codeChanged={this.codeChanged}
              className="source-code p-5"
            />

            <Editor
              value={this.state.testCode}
              options={this.state.options}
              className={`test-code bg-grey p-5 pl-0 ${this.state.showTestCase}`}
            />
          </div>

          {this.state.codeResult}
        </div>

        <div className="flex justify-center p-12 min-h-screen" style={{ 'background-color': 'rgba(238, 155, 250, 0.1)' }}>
          <div class="flex flex-col justify-start relative" style={{ 'min-width': '45%', 'max-width': '45%'}}>
            <SvgBuggy className="absolute pin-t" style={{ transform: 'scaleX(-1)', width: '250px', 'margin-top': '-180px', 'margin-left': '-250px' }} />
            <AnimatedText
              text={[{ 'line': this.state.currentHint, 'key': 0, 'style': 'text-white font-semibold text-xl' }]}
            />
            <a href="#" className="self-end no-underline text-white font-bold p-3">Proximo ></a>
          </div>
        </div>
      </div>
    );
  }
}