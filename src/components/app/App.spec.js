import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from './App';
import Store from '../../store/store';
import { auth } from '../../pages/login/Auth';
import Emitter, { TRACKING } from '../../emitter/Emitter';

const store = Store();

jest.mock('../../queue/queue', () => {
  const { default: mockedQueue } = jest.requireActual('../../queue/queue');
  mockedQueue.prototype.fetch = () => {
    return Promise.resolve();
  };
  return mockedQueue;
});

describe('App component', () => {
  beforeEach(() => {
    auth.insertUserInfo = jest.fn();
  });

  afterEach(() => {
    Emitter.removeAllListeners(TRACKING);
  });

  test('should have sidebar component', done => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    wrapper.instance().setState({
      isFetchingAssets: false
    });
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Sidebar').length).toEqual(1);
      done();
    }, 100);
  });

  test('listen to tracking events on mount', () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    Emitter.emit(TRACKING, {});

    expect(auth.insertUserInfo).toBeCalled();
  });

  test('unmounted component should not listen to events', done => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    wrapper.unmount();

    setTimeout(() => {
      Emitter.emit(TRACKING, {});

      expect(auth.insertUserInfo).toBeCalledTimes(0);
      done();
    }, 900);
  });
});
