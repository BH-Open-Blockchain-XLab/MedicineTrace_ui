import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './Routes.js';
import setStore from './reducers/setStore.js';

import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

ReactDOM.render(
    <Provider store={setStore()}>
        <Routes/>
    </Provider>,
    document.getElementById('root'),
    /*window.onbeforeunload = function() {
        return '确定离开此页吗？';
    }*/
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
