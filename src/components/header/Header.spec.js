import React from 'react';
import Header from './Header';
import { shallow, mount } from 'enzyme';
import Emitter, { LEVEL_UP, PROGRESS_UP, PROGRESS_DOWN } from '../../emitter/Emitter';
import { auth } from '../../pages/login/Auth';
import sinon from 'sinon';

describe('header component', () => {
  const { reload } = window.location;

  beforeAll(() => {
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
    });
    window.location.reload = jest.fn();
  });

  afterAll(() => {
    window.location.reload = reload;
  });

  test('should not show debug button by default', () => {
    const wrapper = mount(<Header />);

    expect(wrapper.find('input[type="button"]').length).toEqual(0);
  });

  test('should render user progress', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('.user-progress').length).toEqual(1);
  });

  test('should render profile', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('.profile').length).toEqual(1);
  });

  test('should add level up animation and remove after 600 ms', done => {
    auth.updateUserInfo = sinon.spy();
    const wrapper = mount(<Header />);

    expect(wrapper.find('.wobble-ver-right').length).toEqual(0);

    Emitter.emit(LEVEL_UP);

    wrapper.update();

    expect(wrapper.find('.wobble-ver-right').length).toEqual(1);
    expect(auth.updateUserInfo.called).toBeTruthy();

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('.wobble-ver-right').length).toEqual(0);
      done();
    }, 600);
  });

  test.each([LEVEL_UP, PROGRESS_UP, PROGRESS_DOWN])(
    'unbind events on unmount - event: %s',
    (currentEvent) => {
      auth.updateUserInfo = sinon.spy();
      const wrapper = mount(<Header />);
      wrapper.unmount();

      Emitter.emit(currentEvent);
      expect(auth.updateUserInfo.called).toBeFalsy();
    },
  );

  test('should go to the introduction', () => {
    auth.updateUserInfo = sinon.spy();

    const wrapper = mount(<Header />);

    wrapper.instance().goToIntroduction();

    expect(auth.updateUserInfo.called).toBeTruthy();
  });
});
