import { MemoryRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import { App } from './App';
import { auth } from '../../pages/login/Auth';
import Emitter, { TRACKING } from '../../packages/emitter/Emitter';

const queuePackage = '../../packages/queue/queue';

jest.mock(queuePackage, () => {
  const { default: mockedQueue } = jest.requireActual(queuePackage);
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
    expect(app.state['isFetchingAssets']).toBeFalsy();
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
