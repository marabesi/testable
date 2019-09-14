// @ts-nocheck
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import { Header } from './Header';
import Emitter, {LEVEL_UP, PROGRESS_UP, PROGRESS_DOWN, LEVEL_DOWN} from '../../emitter/Emitter';

const mockedUser =  {
  uid: '',
  name: '',
  email: '',
  photo: '',
  level: 1,
  tutorial: false,
  introduction: true,
  progress: 10,
};

const mockedHistory = {
  push: jest.fn()
};

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
    const localWrapper = shallow(<Header user={mockedUser} />);
    expect(localWrapper.find('input[type="button"]').length).toEqual(0);
    localWrapper.unmount();
  });

  test('should render user progress', () => {
    const localWrapper = shallow(<Header user={mockedUser} />);
    expect(localWrapper.find('.user-progress').length).toEqual(1);
    localWrapper.unmount();
  });

  test('should render user menu component', () => {
    const localWrapper = shallow(<Header user={mockedUser} />);
    expect(localWrapper.find('UserMenu').length).toEqual(1);
    localWrapper.unmount();
  });

  test('should add level up animation and remove after 600 ms', done => {
    const { auth } = require('../../pages/login/Auth');
    const bkp = auth.updateUserInfo;

    auth.updateUserInfo = sinon.spy();
    const wrapper = shallow(<Header user={mockedUser} history={mockedHistory} />);

    expect(wrapper.find('.wobble-ver-right').length).toEqual(0);

    Emitter.emit(LEVEL_UP);

    wrapper.update();

    expect(wrapper.find('.wobble-ver-right').length).toEqual(1);
    expect(auth.updateUserInfo.called).toBeTruthy();

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('.wobble-ver-right').length).toEqual(0);
      wrapper.unmount();
      auth.updateUserInfo = bkp;
      done();
    }, 600);
  });

  test.each([LEVEL_UP, LEVEL_DOWN, PROGRESS_UP, PROGRESS_DOWN])(
    'unbind events on unmount - event: %s',
    (currentEvent) => {
      const { auth } = require('../../pages/login/Auth');
      const bkp = auth.updateUserInfo;

      auth.updateUserInfo = sinon.spy();
      const localWrapper = shallow(<Header user={mockedUser} />);
      localWrapper.unmount();

      Emitter.emit(currentEvent);
      expect(auth.updateUserInfo.called).toBeFalsy();
      auth.updateUserInfo = bkp;
    },
  );

  test('should go to the introduction', () => {
    const { auth } = require('../../pages/login/Auth');
    const bkp = auth.updateUserInfo;
    auth.updateUserInfo = sinon.spy();

    const wrapper = shallow(<Header user={mockedUser} />);

    wrapper.instance().goToIntroduction();

    expect(auth.updateUserInfo.called).toBeTruthy();

    wrapper.unmount();
    auth.updateUserInfo = bkp;
  });
});

describe('listen to user events', () => {

  test('should level up user', () => {
    const { auth } = require('../../pages/login/Auth');
    const wrapper = shallow(<Header user={mockedUser} history={mockedHistory} />);
    expect(auth.user.level).toEqual(1);
    Emitter.emit(LEVEL_UP);
    expect(auth.user.level).toEqual(2);
    wrapper.unmount();
  });

  test('should level down user', () => {
    const { auth } = require('../../pages/login/Auth');
    auth.user.level = 1;
    const wrapper = shallow(<Header user={mockedUser} history={mockedHistory} />);
    expect(auth.user.level).toEqual(1);
    Emitter.emit(LEVEL_DOWN);
    expect(auth.user.level).toEqual(0);
    wrapper.unmount();
  });

  test('should update user progress up', () => {
    const { auth } = require('../../pages/login/Auth');
    auth.user.progress = 10;
    const wrapper = shallow(<Header user={mockedUser} history={mockedHistory} />);
    expect(auth.user.progress).toEqual(10);
    Emitter.emit(PROGRESS_UP, { amount: 20 });
    expect(auth.user.progress).toEqual(20);
    wrapper.unmount();
  });

  test('should update user progress down', () => {
    const { auth } = require('../../pages/login/Auth');
    auth.user.progress = 10;
    const wrapper = shallow(<Header user={mockedUser} />);
    expect(auth.user.progress).toEqual(10);
    Emitter.emit(PROGRESS_DOWN, { amount: 5 });
    expect(auth.user.progress).toEqual(5);
    wrapper.unmount();
  });

  test('should emit LEVEL_UP event', () => {
    const spy = sinon.spy();
    Emitter.addListener(LEVEL_UP, spy);

    const wrapper = shallow(<Header user={mockedUser} history={mockedHistory} />);
    wrapper.instance().levelUp();
    wrapper.unmount();

    expect(spy.called).toBeTruthy();
  });

  test('should emit LEVEL_DOWN event', () => {
    const spy = sinon.spy();
    Emitter.addListener(LEVEL_DOWN, spy);

    const wrapper = shallow(<Header user={mockedUser} history={mockedHistory} />);
    wrapper.instance().levelDown();
    wrapper.unmount();

    expect(spy.called).toBeTruthy();
  });
});

