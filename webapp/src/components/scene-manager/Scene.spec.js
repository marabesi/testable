import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Scene from './Scene';
import Button from './Button';

describe('Scene component', () => {

  beforeEach(() => {
    window.localStorage.removeItem('testable.alien.png');
  });

  afterEach(() => {
    window.localStorage.removeItem('testable.alien.png');
  });

  test('default props value', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.props().onCompleted).toEqual({});
    expect(wrapper.props().releaseButton).toEqual(2000);
    expect(wrapper.props().showBuggy).toEqual(false);
    expect(wrapper.props().showNextButton).toEqual(900);
  });

  test('by default, does not show up the next button', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find(Button).length).toEqual(0);
  });

  test('by default, the next button is not disabled', done => {
    const wrapper = shallow(
      <Scene
        text={[ {key: 0, line: 'a'} ]}
        button="just a label"
        showNextButton={1}
      />
    );

    wrapper.instance().onFinishedTyping();

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(Button).prop('disabled')).toBeFalsy();
      done();
    }, 10);
  });

  test('by default, does not show alien component', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find('AlienSvg').prop('className')).toContain('hidden');
  });

  test('by default, does not show buggy bug component', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find('BuggyBug').length).toBe(0);
  });

  test('should show alien component', () => {
    const wrapper = mount(
      <Scene
        showAlien={{}}
      />
    );

    expect(wrapper.find('AlienSvg').prop('className').includes('block')).toBeTruthy();
  });

  test('should show alien component with animation', () => {
    const wrapper = mount(
      <Scene
        showAlien={{
          animate: true
        }}
      />
    );

    expect(wrapper.find('AlienSvg').prop('className')).toContain('slide-in-bck-top');
  });

  test('should show up next button', done => {
    const wrapper = shallow(
      <Scene
        text={[ {key: 0, line: 'my'} ]}
        button="mybutton"
        showNextButton={1}
        releaseButton={1}
      />
    );

    wrapper.instance().onFinishedTyping();

    setTimeout(() => {
      wrapper.update();

      expect(wrapper.find(Button).prop('description')).toEqual('mybutton');
      done();
    }, 5);
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
    const NODE_INDEX = 1;
    const wrapper = shallow(
      <Scene
        onCompleted={{showBug: true}}
        text={[ {key: 0, line: 'my'} ]}
        showNextButton={1}
      />
    );

    expect(wrapper.find('BuggyLeft').at(NODE_INDEX).prop('className')).toContain('hidden');

    wrapper.instance().onFinishedTyping();

    setTimeout(() => {
      wrapper.update();

      // @ts-ignore
      expect(wrapper.find('BuggyLeft').at(NODE_INDEX).prop('className')).toContain('slide-in-bck-right');
      done();
    }, 10);
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

    expect(wrapper.find('img').at(3).prop('src')).toEqual('img content');
  });

  test('should handle last scene', done => {
    const handleLastScene = sinon.spy();
    const handleNextScene = sinon.spy();

    const wrapper = shallow(
      <Scene
        lastScene={true}
        handleLastScene={handleLastScene}
        next={handleNextScene}
        text={[{ key: 0, line: 'my' }]}
        showNextButton={1}
        releaseButton={1}
      />
    );

    wrapper.instance().onFinishedTyping();

    setTimeout(() => {
      wrapper.update();
      wrapper.find(Button).simulate('click');

      expect(handleLastScene.called).toBeTruthy();
      expect(handleNextScene.called).toBeFalsy();
      done();
    }, 10);
  });

  test('should handle next scene', done => {
    const handleLastScene = sinon.spy();
    const handleNextScene = sinon.spy();

    const wrapper = shallow(
      <Scene
        lastScene={false}
        handleLastScene={handleLastScene}
        next={handleNextScene}
        text={[{ key: 0, line: 'my' }]}
        showNextButton={1}
        releaseButton={1}
      />
    );

    wrapper.instance().onFinishedTyping();

    setTimeout(() => {
      wrapper.update();
      wrapper.find(Button).simulate('click');

      expect(handleLastScene.called).toBeFalsy();
      expect(handleNextScene.called).toBeTruthy();
      done();
    }, 10);
  });

  test('should disable button once clicked to prevent firing the event twice', done => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Scene
        text={[ {key: 0, line: 'my'} ]}
        button="mybutton"
        next={onClick}
        showNextButton={1}
        releaseButton={1}
      />
    );

    wrapper.instance().onFinishedTyping();

    setTimeout(() => {
      wrapper.update();

      // tries to click 10 times next button
      for (let i = 0; i < 10; i++) {
        wrapper.find(Button).simulate('click');
      }

      expect(onClick).toBeCalledTimes(1);
      done();
    }, 50);
  });

  test('should release disable from next button based on releaseButton prop', done => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Scene
        text={[ {key: 0, line: 'my'} ]}
        button="mybutton"
        next={onClick}
        showNextButton={1}
        releaseButton={5}
      />
    );

    wrapper.instance().onFinishedTyping();

    setTimeout(() => {
      wrapper.update();
      wrapper.find(Button).simulate('click');
      expect(wrapper.find(Button).prop('disabled')).toBeTruthy();
    }, 10);

    setTimeout(() => {
      wrapper.update();

      expect(wrapper.find(Button).prop('disabled')).toBeFalsy();
      done();
    }, 50);
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

    expect(wrapper.find('BuggyBug').length).toBe(1);
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

    expect(wrapper.find('BuggyHappy').length).toBe(1);
  });
});
