import React from 'react';
import { shallow } from 'enzyme';
import { Tutorial } from './Tutorial';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';
import {SOURCE_CODE} from '../../constants/editor';

const ENABLE_EDITOR_ON_HINT = 3;

describe('Tutorial page', () => {
  beforeEach(() => {
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

  test('level up on valid code', () => {
    const callback = jest.fn();
    Emitter.addListener(LEVEL_UP, callback);

    const wrapper = shallow(<Tutorial />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });
    wrapper.instance().onValidCode('function somar(a,b) {return a + b}');

    expect(callback).toBeCalled();
  });

  test('should not level up on invalid code provided', () => {
    const callback = jest.fn();
    Emitter.addListener(LEVEL_UP, callback);

    const wrapper = shallow(<Tutorial />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });
    wrapper.instance().onValidCode('function somar() {}');

    expect(callback).toBeCalledTimes(0);
  });

  test('Enable tooltip', () => {
    const wrapper = shallow(<Tutorial onHover={() => {}} />);
    wrapper.instance().onEnableTooltip();

    expect(wrapper.instance().state.introEnabled).toBe(true);
  });

  describe('toggle attention class once guide has finished to type', () => {
    test('should not toggle class by default', () => {
      const wrapper = shallow(<Tutorial />);

      expect(wrapper.instance().state.toggleEditorClass).toBe(false);
      expect(wrapper.find('EditorManager').prop('options')).toEqual({});
    });

    test('should toggle attention class to editor once guide has finished typing', done => {
      const wrapper = shallow(<Tutorial onHover={hovered => hovered} />);

      wrapper.instance().onEnableTooltip();
      wrapper.instance().onFinishTooltip();
      wrapper.instance().handleProgress();
      wrapper.instance().handleProgress();

      wrapper.instance().onFinishedTyping();

      expect(wrapper.instance().state.toggleEditorClass).toBe(true);
      expect(wrapper.find('EditorManager').prop('options')).toEqual({ [SOURCE_CODE]: { className: 'attention' }});

      setTimeout(() => {
        expect(wrapper.instance().state.toggleEditorClass).toBe(false);
        expect(wrapper.find('EditorManager').prop('options')).toEqual({});
        done();
      }, 3100);
    });
  });
});
