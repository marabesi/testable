// @ts-nocheck
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import { Header } from './Header';
import Achievement from '../icons/Achievement';
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
    const updateUserInfo = sinon.spy();
    const wrapper = shallow(<Header updateUser={updateUserInfo} user={mockedUser} history={mockedHistory} />);

    expect(wrapper.find('.wobble-ver-right').length).toEqual(0);

    Emitter.emit(LEVEL_UP);

    wrapper.update();

    expect(wrapper.find('.wobble-ver-right').length).toEqual(1);
    expect(updateUserInfo.called).toBeTruthy();

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('.wobble-ver-right').length).toEqual(0);
      wrapper.unmount();
      done();
    }, 600);
  });

  test.each([LEVEL_UP, LEVEL_DOWN, PROGRESS_UP, PROGRESS_DOWN])(
    'unbind events on unmount - event: %s',
    (currentEvent) => {
      const updateUserInfo = sinon.spy();
      const localWrapper = shallow(<Header updateUser={updateUserInfo} user={mockedUser} />);
      localWrapper.unmount();

      Emitter.emit(currentEvent);
      expect(updateUserInfo.called).toBeFalsy();
    },
  );

  test('should go to the introduction', () => {
    const updateUserInfo = sinon.spy();

    const wrapper = shallow(<Header updateUser={updateUserInfo} user={mockedUser} />);

    wrapper.instance().goToIntroduction();

    expect(updateUserInfo.called).toBeTruthy();

    wrapper.unmount();
  });
});

describe('listen to user events', () => {

  test('should level up user', () => {
    const updateUserInfo = jest.fn();
    const wrapper = shallow(<Header updateUser={updateUserInfo} user={mockedUser} history={mockedHistory} />);

    Emitter.emit(LEVEL_UP);

    expect(updateUserInfo).toBeCalledWith({ level: 2, progress: 10 });
    wrapper.unmount();
  });

  test('should level down user', () => {
    const updateUserInfo = jest.fn();
    const wrapper = shallow(<Header updateUser={updateUserInfo} user={mockedUser} history={mockedHistory} />);

    Emitter.emit(LEVEL_DOWN);

    expect(updateUserInfo).toBeCalledWith({ level: 0, progress: 10 });
    wrapper.unmount();
  });

  test('should update user progress up', () => {
    const updateUserInfo = jest.fn();
    const wrapper = shallow(<Header updateUser={updateUserInfo} user={mockedUser} history={mockedHistory} />);

    Emitter.emit(PROGRESS_UP, { amount: 20 });

    expect(updateUserInfo).toBeCalledWith({ progress: 20 });
    wrapper.unmount();
  });

  test('should update user progress down', () => {
    const updateUserInfo = jest.fn();

    const wrapper = shallow(<Header updateUser={updateUserInfo} user={mockedUser} />);
    Emitter.emit(PROGRESS_DOWN, { amount: 5 });

    expect(updateUserInfo).toBeCalledWith({ progress: 5 });
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
    const user = Object.assign({}, mockedUser);
    const spy = sinon.spy();
    Emitter.addListener(LEVEL_DOWN, spy);

    const wrapper = shallow(<Header user={user} history={mockedHistory} />);
    wrapper.instance().levelDown();
    wrapper.unmount();

    expect(spy.called).toBeTruthy();
  });

  test('should render achievement icon', () => {
    const wrapper = shallow(<Header user={mockedUser} />);
    expect(wrapper.find(Achievement).length).toBe(1);
  });
});
