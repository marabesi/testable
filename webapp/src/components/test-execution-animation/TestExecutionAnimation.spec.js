import React from 'react';
import { shallow } from 'enzyme';
import TestExecutionAnimationHoC from './TestExecutionAnimation';

const RocketComponent = () => <div></div>;

const TestExecution = TestExecutionAnimationHoC(RocketComponent, ['my test']);

describe('Test execution animation component', () => {

  it('should render test queue after animation delay', done => {
    const wrapper = shallow(
      <TestExecution
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

  it('should display rocket by default', () => {
    const wrapper = shallow(
      <TestExecution testsToExecute={['my test']} />
    );

    expect(wrapper.find(RocketComponent).length).toBe(1);
  });

  it('should add rocket wobble class animation by half time of animation delay', done => {
    const wrapper = shallow(
      <TestExecution
        testsToExecute={['my test']}
        animationDelay={700}
      />
    );

    setTimeout(() => {
      wrapper.update();
      const classes = wrapper.find(RocketComponent).prop('className');

      expect(classes.includes('wobble-hor-bottom')).toBeTruthy();
      done();
    }, 400);
  });

  it('should toggle rocket bouce out top animation class', done => {
    const wrapper = shallow(
      <TestExecution
        testsToExecute={['my test']}
        animationDelay={150}
      />
    );

    setTimeout(() => {
      wrapper.update();
      const classes = wrapper.find(RocketComponent).prop('className');

      expect(classes.includes('bounce-out-top')).toEqual(true);
      done();
    }, 700);
  });

  it('should fire onFinished event once animations has finished', done => {
    const callback = jest.fn();
    shallow(
      <TestExecution
        testsToExecute={['my test']}
        animationDelay={100}
        onFinished={callback}
      />
    );

    setTimeout(() => {
      expect(callback).toBeCalled();
      done();
    }, 900);
  });
});
