import ReactDOM from 'react-dom';
import ReactGA, { InitializeOptions } from 'react-ga';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store/store';
import Background from './components/background/Background';

import './css/index.css';

/* eslint-disable */
const env = process.env.NODE_ENV;
const basename = process.env.REACT_APP_BASE_NAME;
const debug = process.env.REACT_APP_DEBUG === 'true';
/* eslint-enable */

const store = Store();

if (env === 'production') {
  const options : InitializeOptions =  { debug };
  ReactGA.initialize('UA-135081264-1', options);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <Provider store={store}>
    <Background>
      <Online>
        <HashRouter basename={basename}>
          <App />
        </HashRouter>
      </Online>
      <Offline>
        <div className="flex justify-center items-center">
          <h1 className="text-white">Oh snap! You are offline</h1>
        </div>
      </Offline>
    </Background>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

if (debug || env === 'development') {
  // @ts-ignore
  window.store = store;
}