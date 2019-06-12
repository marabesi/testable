import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import Store from './store';
import Background from './components/background/Background';

const env = process.env.NODE_ENV;
const basename = process.env.REACT_APP_BASE_NAME;
const debug = process.env.REACT_APP_DEBUG;

const store = Store();

if (env === 'production') {
  ReactGA.initialize('UA-135081264-1', {debug: debug});
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <Provider store={store}>
    <Background>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Background>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
