jest.mock('../../engine/Reason', () => () => true)

import React from 'react';
import { shallow } from 'enzyme';
import { default as Rocket} from './Rocket';
import Emitter, { TRACKING, LEVEL_UP } from '../../emitter/Emitter';

const fakeComponent = () => <h1>fake component</h1>;

describe('Rocket component', () => {

  afterEach(() => {
    Emitter.removeAllListeners(TRACKING);
    Emitter.removeAllListeners(LEVEL_UP);
  });

  test('track section when the component is loaded', () => {
    const callback = jest.fn();
    Emitter.addListener(TRACKING, callback);

    const HoC = Rocket(
      fakeComponent,
      null,
      null,
      null,
      null,
      null,
      null,
      'my-section'
    );
    shallow(<HoC />);

    expect(callback).toBeCalled();
  });

  test('use the given source code and test code by default', () => {
    const HoC = Rocket(fakeComponent, 'my code', 'my test');
    const wrapper = shallow(<HoC />);

    const currentState = wrapper.instance().state;

    expect(currentState).toEqual({
      code: {
        0: 'my code',
        1: 'my test'
      },
      done: false,
      showNext: false,
      currentHint: 0,
      initialStep: 0,
      introEnabled: false,
      intro: {
        steps: [],
        initialStep: 0
      }
    });
  });

  test('should redirect to next page when done', () => {
    const HoC = Rocket(
      fakeComponent,
      null,
      null,
      null,
      '/completed',
      3,
      null,
      'my-section'
    );

    const wrapper = shallow(<HoC />);

    wrapper.setState({
      done: true
    });

    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Guide').length).toBe(0);
    expect(wrapper.find('EditorManager').length).toBe(0);
  });

  test.each([
    [1, undefined]
  ])('execute code only on the provided step', (currentStep, expected) => {
    const HoC = Rocket(
      fakeComponent,
      null,
      null,
      null,
      null,
      3,
      null,
      'my-section'
    );

    const wrapper = shallow(<HoC />);

    wrapper.setState({
      currentHint: currentStep
    });

    const code = wrapper.instance().onValidCode('my code', 0);

    expect(code).toBe(expected);
  });

  describe('analyze code on valid code execution', () => {
    test('should disable source code editor (index 0 (zero))', () => {
      const sourceCodeEditor = 0;
      const HoC = Rocket(
        fakeComponent,
        null,
        null,
        null,
        null,
        null,
        1,
        'my-section',
        {},
        sourceCodeEditor
      );

      const wrapper = shallow(<HoC />);
      expect(wrapper.instance().onValidCode('code', sourceCodeEditor)).toBe(undefined);
    });

    test('should level up', () => {
      const callback = jest.fn();
      Emitter.addListener(LEVEL_UP, callback);

      const HoC = Rocket(
        fakeComponent,
        null,
        null,
        null,
        null,
        null,
        1,
        'my-section'
      );

      const wrapper = shallow(<HoC />);

      wrapper.setState({
        currentHint: 1
      });

      wrapper.instance().onValidCode('my code', 0);

      expect(callback).toBeCalled();
    });
  });

  describe('guide helper', () => {
    test('should show up next button on finished typing', () => {
      const HoC = Rocket(fakeComponent, 'my code', 'my test', null, null, 1);
      const wrapper = shallow(<HoC />);

      expect(wrapper.instance().state.showNext).toBe(false);

      wrapper.instance().onGuideFinishedTyping()

      wrapper.update();

      expect(wrapper.instance().state.showNext).toBe(true);
    });

    test('should not show up on specified step', () => {
      const HoC = Rocket(fakeComponent, 'my code', 'my test', null, null, 0);
      const wrapper = shallow(<HoC />);

      expect(wrapper.instance().state.showNext).toBe(false);

      wrapper.instance().onGuideFinishedTyping();

      wrapper.update();

      expect(wrapper.instance().state.showNext).toBe(false);
    });
  });

  describe('handle tooltip', () => {
    let IntroWrapper = null;

    beforeEach(() => {
      IntroWrapper = Rocket(
        fakeComponent,
        'my code',
        'my test',
        [ {}, {} ],
        null,
        0,
        null,
        null,
        null,
        null,
        null,
        1
      );
    });

    afterEach(() => {
      IntroWrapper = null;
    });

    test('should enable tooltip based on step 1', () => {
      const wrapper = shallow(<IntroWrapper />);
      // step 0
      wrapper.instance().handleProgress();
      // step 1
      wrapper.instance().handleProgress();
      wrapper.update();
      expect(wrapper.find('Intro').prop('enabled')).toBeTruthy();
    });

    test('should level when tooltip tour has completed', () => {
      const callback = jest.fn();
      Emitter.addListener(LEVEL_UP, callback);

      const wrapper = shallow(<IntroWrapper />);
      wrapper.instance().handleProgress();
      wrapper.instance().onFinishTooltip();
      expect(callback).toBeCalled();
    });
  });
});
