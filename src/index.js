import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from "react-router-dom";
import ReactGA from 'react-ga';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-135081264-1');
}

ReactDOM.render(
  <HashRouter basename={process.env.REACT_APP_BASE_NAME}>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();
