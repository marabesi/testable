import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Completed } from './Completed';
import Emmiter, { LEVEL_UP } from '../../emitter/Emitter';

describe('completed page',  () => {

  let wrappedComponent = null;

  beforeEach(() => {
    Emmiter.removeAllListeners(LEVEL_UP);
    wrappedComponent = shallow(
      <BrowserRouter>
        <Completed onLoading={() => false} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    Emmiter.removeAllListeners(LEVEL_UP);
    wrappedComponent = null;
  });

  test('render SceneManager', () => {
    const wrapper = wrappedComponent.find('Completed').dive();
    expect(wrapper.find('SceneManager').length).toBe(1);
  });

  describe('handling last scene', () => {
    test('should level up', () => {
      const callback = jest.fn();
      Emmiter.addListener(LEVEL_UP, callback);

      wrappedComponent.find('Completed').dive().instance().handleLastScene();

      expect(callback).toBeCalled();
    });

    test('should redirect to survey', () => {
      const wrappedPage = wrappedComponent.find('Completed').dive();
      wrappedPage.instance().setState({
        redirect: true
      });

      expect(wrappedPage.find('Redirect').length).toBe(1);
    });
  });
});
