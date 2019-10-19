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

  it('render  regular component (HoC)', () => {
    expect(wrappedComponent.find(RegularFlow).length).toBe(1);
  });

  it('should be hidden by default (regular component)', () => {
    const wrapper = shallow(
      <CompletedIntro
        testsToExecute={['my test']}
      />
    );

    const regularFlowClasses = wrapper.find(RegularFlow).prop('className');

    expect(regularFlowClasses.includes('hidden')).toBeTruthy();
  });

  it('should add regular flow animation once queu test animation is completed', done => {
    const wrapper = shallow(
      <CompletedIntro
        testsToExecute={['my test']}
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

  it('should level up', () => {
    const callback = jest.fn();
    Emitter.addListener(LEVEL_UP, callback);

    const wrapper = shallow(<CompletedIntro />);

    wrapper.instance().redirect();

    expect(callback).toBeCalled();
  });
});
