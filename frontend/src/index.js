/*
 Import order:

 React
 Redux
 External libs / components
 My libs / components
 Actions
 Functions and Constants
 Style and CSS

 Other
 */

/* React */
import React from 'react';
import ReactDOM from 'react-dom';

/* Redux */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducers from './reducers';


/* Actual APP */
import App from './App';
import './style/css/index.css';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    combineReducers({
        ...reducers
    }),
    applyMiddleware()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

registerServiceWorker();
