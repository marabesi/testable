import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import SceneContentManager from './SceneContentManager';

describe('SceneContentManager page', () => {
  let HoC;

  beforeEach(() => {
    HoC = SceneContentManager(
      'hoc_component',
      {},
      'my-route'
    );
  });

  afterEach(() => {
    HoC = null;
  });

  test('should redirect to tutorial page', done => {
    const history = {
      push: jest.fn()
    };
    const wrapper = mount(
      <BrowserRouter>
        <HoC history={history} />
      </BrowserRouter>
    );
    wrapper.find('SceneContentManager').instance().handleLastScene();

    wrapper.update();

    setTimeout(() => {
      done();
      wrapper.update();
      expect(history.push).toBeCalledWith('my-route');
    }, 1100);
  });
});
