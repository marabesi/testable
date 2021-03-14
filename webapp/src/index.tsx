import ReactDOM from 'react-dom';
import ReactGA, { InitializeOptions } from 'react-ga';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import Store from './data-flow/redux/store/store';
import Background from './components/ui/interface/background/Background';
import config, { DEVELOPMENT_MODE, PRODUCTION_MODE } from './config';

import './css/index.css';

const { env, basename, isDebug } = config;

const store = Store();

if (env === PRODUCTION_MODE) {
  const options: InitializeOptions = { debug: isDebug };
  ReactGA.initialize('UA-135081264-1', options);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <Provider store={store}>
    <Background>
      <HashRouter basename={basename}>
        <App />
      </HashRouter>
    </Background>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

if (isDebug || env === DEVELOPMENT_MODE) {
  // @ts-ignore
  window.store = store;
}