import React from 'react';
import { shallow } from 'enzyme';
import CompletedIntro, { RegularFlow } from './CompletedIntro';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

describe('completed intro page',  () => {

  let wrappedComponent = null;

  beforeEach(() => {
    wrappedComponent = shallow(
      <CompletedIntro />
    );
    Emitter.removeAllListeners(LEVEL_UP);
  });

  afterEach(() => {
    wrappedComponent = null;
    Emitter.removeAllListeners(LEVEL_UP);
  });

  test('render  regular component (HoC)', () => {
    expect(wrappedComponent.find(RegularFlow).length).toBe(1);
  });

  test('should be hidden by default (regular component)', () => {
    const wrapper = shallow(
      <CompletedIntro />
    );

    const regularFlowClasses = wrapper.find(RegularFlow).prop('className');

    expect(regularFlowClasses.includes('hidden')).toBeTruthy();
  });

  test('should add regular flow animation once queu test animation is completed', done => {
    const wrapper = shallow(
      <CompletedIntro
        animationDelay={100}
      />
    );

    setTimeout(() => {
      wrapper.instance().onAnimationCompleted();
      wrapper.update();

      const classes = wrapper.find(RegularFlow).prop('className');

      expect(classes.includes('scale-in-center')).toBeTruthy();
      done();
    }, 900);
  });

  test('should level up', () => {
    const callback = jest.fn();
    Emitter.addListener(LEVEL_UP, callback);

    const wrapper = shallow(<CompletedIntro />);

    wrapper.instance().redirect();

    expect(callback).toBeCalled();
  });
});
