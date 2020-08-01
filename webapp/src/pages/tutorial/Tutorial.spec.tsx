import React from 'react';
import { shallow } from 'enzyme';
import { Tutorial } from './Tutorial';
import {SOURCE_CODE} from '../../constants/editor';

const ENABLE_EDITOR_ON_HINT = 3;
const userData = { level: 1, progress: 10 };

describe('Tutorial page', () => {
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
    const callback = jest.fn();
    const wrapper = shallow(<Tutorial user={userData} updateUser={callback} />);
    wrapper.instance().setState({
      currentHint
    });

    expect(wrapper.instance().onValidCode('')).toBe(undefined);
  });

  test('level up when last tutorial content step is reached', () => {
    const callback = jest.fn();

    const wrapper = shallow(<Tutorial user={userData} updateUser={callback} />);
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

    const wrapper = shallow(<Tutorial user={userData} updateUser={callback} />);
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
    const callback = jest.fn();
    const wrapper = shallow(<Tutorial user={userData} updateUser={callback} />);
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
      const callback = jest.fn();
      const wrapper = shallow(<Tutorial user={userData} updateUser={callback} />);
      wrapper.update();
      expect(wrapper.find('EditorManager').prop('options')[SOURCE_CODE].readOnly).toBe(true);
    });

    test('should toggle attention class to editor once guide has finished typing', done => {
      const callback = jest.fn();
      const wrapper = shallow(<Tutorial onHover={hovered => hovered} user={userData} updateUser={callback} />);

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

  test.each([
    'function somar(a,b) { return a+b }',
  ])('valid code behavior %s', (code) => {
    const callback = jest.fn();
    const wrapper = shallow(<Tutorial user={userData} updateUser={callback} />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT + 1);
  });

  test.each([
    '(a,b) => { return a+b }',
    'function() => { return }',
    'function(a, a) => { return a + a }',
  ])('invalid code behavior %s', (code) => {
    const callback = jest.fn();
    const wrapper = shallow(<Tutorial user={userData} updateUser={callback} />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });

  test('should update state with error message', () => {
    const callback = jest.fn();
    const wrapper = shallow(<Tutorial user={userData} updateUser={callback} />);
    wrapper.instance().onErrorCode('something went wrong');
    expect(wrapper.instance().state.editorError).toEqual('something went wrong');
  });
});
