import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SceneContentManager from './SceneContentManager';
import SceneManager from './SceneManager';

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

  test('should redirect to tutorial page', () => {
    const history = {
      push: jest.fn()
    };
    const wrapper = mount(
      <BrowserRouter>
        <HoC history={history} />
      </BrowserRouter>
    );
    wrapper.find(SceneManager).props().handleLastScene();

    wrapper.update();

    expect(history.push).toBeCalledWith('my-route');
  });

  test('should invoke last scene callback when given as props', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <BrowserRouter>
        <HoC history={history} handleLastScene={callback} />
      </BrowserRouter>
    );

    act(() => {
      wrapper.find(SceneManager).props().handleLastScene();
    });

    wrapper.update();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
