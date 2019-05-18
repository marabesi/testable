import React from 'react';
import Scene from './Scene';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

describe('Scene component', () => {
  it('by default, does not show up the next button', () => {
    const wrapper = shallow(<Scene />);

    expect(wrapper.find('button').length).toEqual(0);
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

      expect(wrapper.find('button').text()).toEqual('mybutton');
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
    const wrapper = mount(
      <Scene
        onCompleted={{showBug: true}}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    setTimeout(() => {
      wrapper.update();

      expect(wrapper.find('img').prop('src')).toEqual('assets/buggy.png');
      done();
    }, 1500);
  });

  test('should show up alien character', () => {
    const wrapper = mount(
      <Scene
        showAlien={true}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('img').prop('src')).toEqual('assets/alien.png');
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
});
