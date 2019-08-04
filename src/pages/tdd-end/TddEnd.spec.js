import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {mount, shallow} from 'enzyme';
import {TddEnd} from './TddEnd';
import Emmiter, {LEVEL_UP} from '../../emitter/Emitter';

describe('tdd end page', () => {

  let wrappedComponent = null;

  beforeEach(() => {
    Emmiter.removeAllListeners(LEVEL_UP);
    wrappedComponent = shallow(
      <BrowserRouter>
        <TddEnd onLoading={() => false} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    Emmiter.removeAllListeners(LEVEL_UP);
    wrappedComponent = null;
  });
  
  test('render tdd end page', () => {
    const wrapper = mount(<TddEnd />);
    expect(wrapper.find('SceneManager').length).toBe(1);
  });

  describe('handles the last scene', () => {
    test('should level up', () => {
      const callback = jest.fn();
      Emmiter.addListener(LEVEL_UP, callback);

      wrappedComponent.find('TddEnd').dive().instance().handleLastScene();

      expect(callback).toBeCalled();
    });

    test('should redirect to rocket 01', () => {
      const wrappedPage = wrappedComponent.find('TddEnd').dive();
      wrappedPage.instance().setState({
        redirect: true
      });
      const redirect = wrappedPage.find('Redirect');
      expect(redirect.length).toBe(1);
      expect(redirect.prop('to').pathname).toEqual('/rocket-01');
    });

    test('should enable loading', () => {
      const onLoading = jest.fn();

      const wrapper = mount(
        <BrowserRouter>
          <TddEnd onLoading={onLoading} />
        </BrowserRouter>
      );
      wrapper.find('TddEnd').instance().handleLastScene();

      expect(onLoading).toBeCalledWith(true);
    });

    test('should disable loading', done => {
      const onLoading = jest.fn();

      const wrappedWithRouter = mount(
        <BrowserRouter>
          <TddEnd onLoading={onLoading} />
        </BrowserRouter>
      );

      wrappedWithRouter.find('TddEnd').instance().handleLastScene();

      setTimeout(() => {
        expect(onLoading).toBeCalledWith(false);
        done();
      }, 1400);
    });
  });
});