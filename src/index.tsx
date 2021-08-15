import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';

import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers';
import App from './components/app/app';
import './index.css';


declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);


ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
