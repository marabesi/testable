import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Scene from './Scene';

describe('Scene component', () => {

  beforeEach(() => {
    window.localStorage.removeItem('testable.alien.png');
  });

  afterEach(() => {
    window.localStorage.removeItem('testable.alien.png');
  });

  test('by default, does not show up the next button', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find('Button').length).toEqual(0);
  });

  test('by default, the next button is not disabled', done => {
    const wrapper = mount(
      <Scene
        text={[ {key: 0, line: 'a'} ]}
        button="just a label"
      />
    );

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Button').prop('disabled')).toBeFalsy();
      done();
    }, 1500);
  });

  test('by default, does not show alien component', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find('AlienSvg').prop('className')).toContain('hidden');
  });

  test('by default, does not show buggy bug component', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find('SvgBuggyBug').length).toBe(0);
  });

  test('should show alien component', () => {
    const wrapper = mount(
      <Scene
        showAlien={{}}
      />
    );

    expect(wrapper.find('AlienSvg').prop('className').includes('hidden')).toBeFalsy();
  });

  test('should show alien component with animation', () => {
    const wrapper = mount(
      <Scene
        showAlien={{
          animate: true
        }}
      />
    );

    expect(wrapper.find('AlienSvg').prop('className').includes('hidden')).toBeFalsy();
    expect(wrapper.find('AlienSvg').prop('className')).toContain('slide-in-bck-top');
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

  test('pass in a custom class to the scene container', () => {
    const wrapper = mount(
      <Scene
        className="custom-class"
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('div').at(0).hasClass('custom-class')).toBeTruthy();
  });

  test('should show up buggy component after typing', done => {
    const wrapper = mount(
      <Scene
        onCompleted={{showBug: true}}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('BuggyLeft').prop('className')).toContain('hidden');

    setTimeout(() => {
      wrapper.update();

      // @ts-ignore
      expect(wrapper.find('BuggyLeft').prop('className').includes('hidden')).toBeFalsy();
      expect(wrapper.find('BuggyLeft').prop('className')).toContain('slide-in-bck-right');
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

    expect(wrapper.find('img').at(2).prop('src')).toEqual('img content');
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

  test('should render buggy bug version', () => {
    const wrapper = mount(
      <Scene
        showBuggy={{
          type: 'bug',
        }}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('SvgBuggyBug').length).toBe(1);
  });

  test('should render buggy happy version', () => {
    const wrapper = mount(
      <Scene
        showBuggy={{
          type: 'happy',
        }}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('SvgBuggyHappy').length).toBe(1);
  });
});
