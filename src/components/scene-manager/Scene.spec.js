import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Scene from './Scene';
import { localStorageMock } from '../../__test__/stubs/localStorage';

describe('Scene component', () => {

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    window.localStorage.clear();
  });

  test('by default, does not show up the next button', () => {
    const wrapper = shallow(<Scene />);

    expect(wrapper.find('Button').length).toEqual(0);
  });

  test('should show up next button', done => {
    const wrapper = mount(
      <Scene
        text={[ {key: 0, line: 'my'} ]}
        button="mybutton"
      />
    );

    setTimeout(() => {
      wrapper.update();

      expect(wrapper.find('Button').text()).toEqual('mybutton');
      done();
    }, 1500);
  });

  test('pass in a custom class', () => {
    const wrapper = mount(
      <Scene
        className="custom-class"
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('div').at(0).hasClass('custom-class')).toBeTruthy();
  });

  test('should show up buggy character', done => {
    window.localStorage.setItem('testable.buggy.png', 'img buggy content');
    const wrapper = mount(
      <Scene
        onCompleted={{showBug: true}}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    setTimeout(() => {
      wrapper.update();

      expect(wrapper.find('img').at(0).prop('src')).toEqual('img buggy content');
      done();
    }, 1500);
  });

  test('should show up alien character', () => {
    window.localStorage.setItem('testable.alien.png', 'img content');
    const wrapper = mount(
      <Scene
        showAlien={{
          'show': true,
          'animate': false
        }}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('img').at(1).prop('src')).toEqual('img content');
  });

  test('should handle last scene', done => {
    const handleLastScene = sinon.spy();
    const handleNextScene = sinon.spy();

    const wrapper = mount(
      <Scene
        lastScene={true}
        handleLastScene={handleLastScene}
        next={handleNextScene}
        text={[{ key: 0, line: 'my' }]}
      />
    );

    setTimeout(() => {
      wrapper.update();
      wrapper.find('button').simulate('click');

      expect(handleLastScene.called).toBeTruthy();
      expect(handleNextScene.called).toBeFalsy();
      done();
    }, 1500);
  });

  test('should handle next scene', done => {
    const handleLastScene = sinon.spy();
    const handleNextScene = sinon.spy();

    const wrapper = mount(
      <Scene
        lastScene={false}
        handleLastScene={handleLastScene}
        next={handleNextScene}
        text={[{ key: 0, line: 'my' }]}
      />
    );

    setTimeout(() => {
      wrapper.update();
      wrapper.find('button').simulate('click');

      expect(handleLastScene.called).toBeFalsy();
      expect(handleNextScene.called).toBeTruthy();
      done();
    }, 1500);
  });

  test('should disable button once clicked to prevent firing the event twice', done => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Scene
        text={[ {key: 0, line: 'my'} ]}
        button="mybutton"
        next={onClick}
      />
    );

    setTimeout(() => {
      wrapper.update();

      // tries to click 10 times next button
      for (let i = 0; i < 10; i++) {
        wrapper.find('button').simulate('click');
      }

      expect(onClick).toBeCalledTimes(1);
      done();
    }, 1500);
  });

  test('should released disable from next button after two seconds', done => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Scene
        text={[ {key: 0, line: 'my'} ]}
        button="mybutton"
        next={onClick}
      />
    );

    setTimeout(() => {
      wrapper.update();
      wrapper.find('button').simulate('click');
      expect(wrapper.find('Button').prop('disabled')).toBeTruthy();
    }, 1500);

    setTimeout(() => {
      wrapper.update();

      expect(wrapper.find('Button').prop('disabled')).toBeFalsy();
      done();
    }, 3600);
  });
});
