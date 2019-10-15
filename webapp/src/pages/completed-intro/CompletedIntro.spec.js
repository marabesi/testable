import React from 'react';
import { shallow, mount } from 'enzyme';
import CompletedIntro, { RegularFlow, DEFAULT_DELAY } from './CompletedIntro';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

describe('completed page',  () => {

  let wrappedComponent = null;

  beforeEach(() => {
    wrappedComponent = shallow(
      <CompletedIntro />
    );
  });

  afterEach(() => {
    wrappedComponent = null;
  });

  it('render HoC', () => {
    expect(wrappedComponent.find(RegularFlow).length).toBe(1);
  });

  it('tests queue should be empty by default', () => {
    expect(wrappedComponent.find('.test-container-check').length).toBe(0);
  });

  it('render tests queue after 2 seconds', done => {
    const wrapper = shallow(
      <CompletedIntro testsToExecute={['my test']} />
    );

    wrapper.instance().handleLastScene();

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('h1').text()).toEqual('my test');
      done();
    }, DEFAULT_DELAY);
  });

  it('redirects to next page once tests queue is completed', done => {
    const callback = jest.fn();
    Emitter.addListener(LEVEL_UP, callback);

    const wrapper = shallow(
      <CompletedIntro
        testsToExecute={['my test']}
      />
    );

    wrapper.instance().handleLastScene();

    setTimeout(() => {
      expect(callback).toBeCalled();
      done();
    }, DEFAULT_DELAY * 2);
  });

  it('resets tests queue on component unmount', done => {
    const wrapper = mount(
      <CompletedIntro testsToExecute={[
        'my test'
      ]} />
    );

    wrapper.instance().handleLastScene();

    setTimeout(() => {
      wrapper.update();
      wrapper.unmount();

      expect(wrapper.find('h1').length).toBe(0);

      done();
    }, DEFAULT_DELAY);
  });
});
