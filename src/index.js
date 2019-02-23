import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './tailwind.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
