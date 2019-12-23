import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';
import matchReducer from './reducers/matchReducer';
import authReducer from './reducers/authReducer';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logout } from './actions/authActions';

const rootReducer = combineReducers({
    match: matchReducer,
    auth: authReducer
});

const intialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    intialState,
    compose(
        applyMiddleware(...middleware)
    )
);

if (localStorage.token) {
    // Set auth token header auth
    setAuthToken(localStorage.token);

    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.token);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {


        //logout user
        store.dispatch(logout());

        window.location.href = '/login';
    }
}

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
