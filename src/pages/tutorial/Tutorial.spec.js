import React from 'react';
import { shallow } from 'enzyme';
import { Tutorial } from './Tutorial';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';
import {SOURCE_CODE} from '../../constants/editor';
import { auth } from '../login/Auth';

const ENABLE_EDITOR_ON_HINT = 3;

describe('Tutorial page', () => {
  beforeEach(() => {
    auth.updateUserInfo = jest.fn();
    Emitter.removeAllListeners(LEVEL_UP);
  });

  afterEach(() => {
    Emitter.removeAllListeners(LEVEL_UP);
  });

  test('renders without crashing', () => {
    const wrapper = shallow(<Tutorial />);

    expect(wrapper.find('Intro').length).toBe(1);
    expect(wrapper.find('EditorManager').length).toBe(1);
  });

  test.each([
    0,
    1,
    2,
  ])('should not enable editor before the allowed hint - current hint %s', (currentHint) => {
    const wrapper = shallow(<Tutorial />);
    wrapper.instance().setState({
      currentHint
    });

    expect(wrapper.instance().onValidCode('')).toBe(undefined);
  });

  test('level up when last tutorial content step is reached', () => {
    const callback = jest.fn();
    Emitter.addListener(LEVEL_UP, callback);

    const wrapper = shallow(<Tutorial />);
    wrapper.instance().setState({
      tutorialContent: [
        { line: 'content first step', style: '' }, { line: 'content last step', style: '' }
      ]
    });
    wrapper.instance().nextHint();
    wrapper.instance().nextHint();

    expect(callback).toBeCalled();
  });

  test('should not level up on invalid code', () => {
    const callback = jest.fn();
    Emitter.addListener(LEVEL_UP, callback);

    const wrapper = shallow(<Tutorial />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });
    wrapper.instance().onValidCode('function somar() {}');

    expect(callback).toBeCalledTimes(0);
  });

  test('should enable tooltip', () => {
    const wrapper = shallow(<Tutorial onHover={() => {}} />);
    wrapper.instance().onEnableTooltip();

    expect(wrapper.instance().state.introEnabled).toBe(true);
  });

  test('tutorial done flag should be false by default', () => {
    const wrapper = shallow(<Tutorial />);
    expect(wrapper.instance().state.tutorialDone).toBeFalsy();
  });

  test('should redirect once tutorial content is finished', () => {
    const wrapper = shallow(<Tutorial />);
    wrapper.instance().nextHint();
    wrapper.instance().nextHint();
    wrapper.instance().nextHint();
    wrapper.instance().nextHint();
    wrapper.instance().nextHint();
    wrapper.instance().nextHint();
    expect(wrapper.instance().state.tutorialDone).toBeTruthy();
  });

  describe('animation behavior once guide has finished typing', () => {
    test('editor should be read only by default', () => {
      const wrapper = shallow(<Tutorial />);
      wrapper.update();
      expect(wrapper.find('EditorManager').prop('options')[SOURCE_CODE].readOnly).toBe(true);
    });

    test('should toggle attention class to editor once guide has finished typing', done => {
      const wrapper = shallow(<Tutorial onHover={hovered => hovered} />);

      wrapper.instance().onEnableTooltip();
      wrapper.instance().onFinishTooltip();
      wrapper.instance().handleProgress();
      wrapper.instance().handleProgress();

      wrapper.instance().onFinishedTyping();

      expect(wrapper.find('EditorManager').prop('options')[SOURCE_CODE].className).toEqual('attention');

      setTimeout(() => {
        expect(wrapper.find('EditorManager').prop('options')[SOURCE_CODE].className).toEqual('');
        done();
      }, 3100);
    });
  });
});
