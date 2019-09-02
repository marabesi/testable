import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { App } from './App';
import { auth } from '../../pages/login/Auth';
import Emitter, { TRACKING } from '../../emitter/Emitter';

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

  test('should have sidebar component', () => {
    const wrapper = shallow(
      <Router>
        <App />
      </Router>
    );
    const app = wrapper.find('App').dive();
    app.instance().setState({
      isFetchingAssets: false
    });
    app.update();
    expect(app.state.isFetchingAssets).toBeFalsy();
  });

  test('listen to tracking events on mount', () => {
    const wrapper = mount(
      <Router>
        <App />
      </Router>
    );

    Emitter.emit(TRACKING, {});
    wrapper.unmount();

    expect(auth.insertUserInfo).toBeCalled();
  });

  test('unmounted component should not listen to events', done => {
    const wrapper = shallow(
      <Router>
        <App />
      </Router>
    );

    wrapper.unmount();

    setTimeout(() => {
      Emitter.emit(TRACKING, {});

      expect(auth.insertUserInfo).toBeCalledTimes(0);
      done();
    }, 900);
  });
});
