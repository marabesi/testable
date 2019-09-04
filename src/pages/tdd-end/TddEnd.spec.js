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

    test('should redirect when done', done => {
      const wrappedWithRouter = mount(
        <BrowserRouter>
          <TddEnd />
        </BrowserRouter>
      );

      wrappedWithRouter.find('TddEnd').instance().handleLastScene();

      setTimeout(() => {
        wrappedWithRouter.update();
        expect(wrappedWithRouter.find('Redirect').length).toBe(1);
        done();
      }, 1400);
    });
  });
});