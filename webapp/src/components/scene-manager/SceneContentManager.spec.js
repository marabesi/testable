import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import SceneContentManager from './SceneContentManager';

describe('SceneContentManager page', () => {
  let wrapper;

  beforeEach(() => {
    const HoC = SceneContentManager(
      'hoc_component',
      {},
      'my-route'
    );
    wrapper  = mount(
      <BrowserRouter>
        <HoC />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper = null;
  });

  test('should redirect to tutorial page', done => {
    wrapper.find('SceneContentManager').instance().handleLastScene();

    wrapper.update();

    setTimeout(() => {
      done();
      wrapper.update();
      expect(wrapper.find('Redirect').length).toEqual(1);
    }, 1100);
  });
});
