// @ts-nocheck
jest.mock('../../engine/Reason', () => () => true);

import React from 'react';
import { shallow } from 'enzyme';
import { default as Rocket} from './Rocket';
import Emitter, { TRACKING, LEVEL_UP } from '../../emitter/Emitter';
import {SOURCE_CODE, TEST_CODE} from '../../constants/editor';

describe('Rocket HoC component', () => {

  beforeEach(() => {
    Emitter.removeAllListeners(TRACKING);
    Emitter.removeAllListeners(LEVEL_UP);
  });

  afterEach(() => {
    Emitter.removeAllListeners(TRACKING);
    Emitter.removeAllListeners(LEVEL_UP);
  });

  test('should accept editor options by parameter', () => {
    const HoC = Rocket(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      'my-section',
      null,
      null,
      null,
      null,
      {
        [SOURCE_CODE]: {
          readOnly: true
        },
        [TEST_CODE]: {}
      }
    );

    const wrapper = shallow(<HoC />);

    expect(wrapper.instance().state.editorOptions[SOURCE_CODE].readOnly).toBe(true);
    expect(wrapper.find('EditorManager').props().options[SOURCE_CODE].readOnly).toEqual(true);
  });

  test('test source code editor should be read only by default', () => {
    const HoC = Rocket();
    const wrapper = shallow(<HoC />);
    expect(wrapper.find('EditorManager').props().options[SOURCE_CODE].readOnly).toBe(true);
  });

  test('track section when the component is loaded', () => {
    const callback = jest.fn();
    Emitter.addListener(TRACKING, callback);

    const HoC = Rocket(
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
    const HoC = Rocket('my code', 'my test');
    const wrapper = shallow(<HoC />);

    const currentState = wrapper.instance().state;

    expect(currentState.code[SOURCE_CODE]).toEqual('my code');
    expect(currentState.code[TEST_CODE]).toEqual('my test');
  });

  test('should redirect to next page when done', () => {
    const HoC = Rocket(
      null,
      null,
      null,
      '/completed',
      '',
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
  ])('execute onValidCode function on the provided step only', (currentStep, expected) => {
    const HoC = Rocket(
      null,
      null,
      null,
      null,
      '',
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
        null,
        null,
        null,
        null,
        null,
        1,
        'my-section',
        {},
        {},
        sourceCodeEditor
      );

      const wrapper = shallow(<HoC />);
      expect(wrapper.instance().onValidCode('code', sourceCodeEditor)).toBe(undefined);
    });

    test('should level up on content last step', () => {
      const callback = jest.fn();
      Emitter.addListener(LEVEL_UP, callback);

      const HoC = Rocket(
        null,
        null,
        [],
        [],
        [ { line: 'content first step', style: '' }, { line: 'content last step', style: '' } ],
        null,
        null,
        1,
        'my-section'
      );

      const wrapper = shallow(<HoC />);

      wrapper.instance().handleProgress();
      wrapper.instance().handleProgress();

      expect(callback).toBeCalledTimes(1);
    });
  });

  test('should execute onValidCode function when test code is changed', () => {
    const HoC = Rocket(
      null,
      null,
      [],
      [],
      null,
      null,
      1,
      1,
      'my-section-test-code-only'
    );

    const wrapper = shallow(<HoC />);

    wrapper.setState({
      currentHint: 1
    });

    const code = wrapper.instance().onValidCode('my code', TEST_CODE);

    expect(code).toBe(undefined);
    expect(wrapper.instance().state.currentHint).toBe(2);
  });

  describe('guide helper', () => {
    test('should show up next button on finished typing', () => {
      const HoC = Rocket(
        'my code',
        'my test',
        [],
        [],
        null,
        null,
        1
      );
      const wrapper = shallow(<HoC />);

      expect(wrapper.instance().state.showNext).toBe(false);

      wrapper.instance().onGuideFinishedTyping()

      wrapper.update();

      expect(wrapper.instance().state.showNext).toBe(true);
    });

    test('should not show up on specified step', () => {
      const HoC = Rocket(
        'my code',
        'my test',
        [],
        [],
        null,
        null,
        0,
        null,
        null,
        null,
        null,
        null,
        null,
        {
          [SOURCE_CODE]: {
            readOnly: true
          },
          [TEST_CODE]: {}
        }
      );
      const wrapper = shallow(<HoC />);

      expect(wrapper.instance().state.showNext).toBe(false);

      wrapper.instance().onGuideFinishedTyping();

      wrapper.update();

      expect(wrapper.instance().state.showNext).toBe(false);
    });

    test.each([
      SOURCE_CODE,
      TEST_CODE,
    ])('should toggle attention class to editor once the guide has finished typing', (editor, done) => {
      const HoC = Rocket(
        'my code',
        'my test',
        [],
        [],
        null,
        null,
        0,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [
          editor
        ]
      );
      const wrapper = shallow(<HoC />);
      wrapper.instance().onGuideFinishedTyping();
      wrapper.update();
      expect(wrapper.find('EditorManager').props().options[editor].className).toEqual('attention');

      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find('EditorManager').props().options[editor].className).toEqual('');
        done();
      }, 3100);
    });
  });

  describe('handle tooltip', () => {
    let IntroWrapper = null;

    beforeEach(() => {
      IntroWrapper = Rocket(
        'my code',
        'my test',
        [],
        [],
        [ {}, {} ],
        null,
        0,
        null,
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

    test('should not level up when tooltip tour has completed', () => {
      const callback = jest.fn();
      Emitter.addListener(LEVEL_UP, callback);

      const wrapper = shallow(<IntroWrapper />);
      wrapper.instance().handleProgress();
      wrapper.instance().onFinishTooltip();
      expect(callback).toBeCalledTimes(0);
    });

    test('should not level up if the current hint is different from the tooltip', () => {
      const callback = jest.fn();
      Emitter.addListener(LEVEL_UP, callback);

      const wrapper = shallow(<IntroWrapper />);

      wrapper.instance().setState({
        currentHint: 0
      });

      wrapper.instance().onFinishTooltip();
      expect(callback).toBeCalledTimes(0);
    });
  });
});
