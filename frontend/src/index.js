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


/* Actual APP */
import App from './App';
import './style/css/index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
);

registerServiceWorker();
