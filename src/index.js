import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './tailwind.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-135081264-1');
}

ReactDOM.render(
  <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
