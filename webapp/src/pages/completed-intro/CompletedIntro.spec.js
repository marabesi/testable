import React from 'react';
import { shallow } from 'enzyme';
import CompletedIntro, { RegularFlow } from './CompletedIntro';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

describe('completed page',  () => {

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

  it('regular component should be hidden by default', () => {
    const wrapper = shallow(
      <CompletedIntro
        testsToExecute={['my test']}
      />
    );

    const regularFlowClasses = wrapper.find(RegularFlow).prop('className');

    expect(regularFlowClasses.includes('hidden')).toBeTruthy();
  });

  it('renders test queue after animation delay', done => {
    const wrapper = shallow(
      <CompletedIntro
        testsToExecute={['my test']}
        animationDelay={200}
      />
    );

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('h1').text()).toEqual('my test');
      done();
    }, 300);
  });

  it('displays rocket by default', () => {
    const wrapper = shallow(
      <CompletedIntro testsToExecute={['my test']} />
    );

    expect(wrapper.find('BuggyRocket').length).toBe(1);
  });

  it('adds rocket wobble class animation by half time of animation delay', done => {
    const wrapper = shallow(
      <CompletedIntro
        testsToExecute={['my test']}
        animationDelay={700}
      />
    );

    setTimeout(() => {
      wrapper.update();
      const classes = wrapper.find('BuggyRocket').prop('className');

      expect(classes.includes('wobble-hor-bottom')).toBeTruthy();
      done();
    }, 400);
  });

  it('toggles rocket bouce out top animation class', done => {
    const wrapper = shallow(
      <CompletedIntro
        testsToExecute={['my test']}
        animationDelay={150}
      />
    );

    setTimeout(() => {
      wrapper.update();
      const classes = wrapper.find('BuggyRocket').prop('className');

      expect(classes.includes('bounce-out-top')).toEqual(true);
      done();
    }, 700);
  });

  it('adds regular flow animation once queu test animation is completed', done => {
    const wrapper = shallow(
      <CompletedIntro
        testsToExecute={['my test']}
        animationDelay={100}
      />
    );

    setTimeout(() => {
      wrapper.update();
      const classes = wrapper.find(RegularFlow).prop('className');

      expect(classes.includes('scale-in-center')).toBeTruthy();
      done();
    }, 900);
  });

  it('level up', () => {
    const callback = jest.fn();
    Emitter.addListener(LEVEL_UP, callback);

    const wrapper = shallow(<CompletedIntro />);

    wrapper.instance().redirect();

    expect(callback).toBeCalled();
  });
});
