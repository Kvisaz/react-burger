import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import App from './components/app/app';
import './index.css';
import { AppStore } from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { API } from './services/services/ApiService';