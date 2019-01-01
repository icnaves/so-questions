import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux'
import logger from 'redux-logger'

import reducers from './reducers'

import App from './App';

const store = createStore(
	reducers,
	applyMiddleware(
		logger,
		thunkMiddleware
	)
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));