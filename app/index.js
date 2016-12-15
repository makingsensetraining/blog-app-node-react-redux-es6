/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadPosts} from './actions/postActions';
//Webpack CSS import
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/griddle-react-bootstrap/dist/griddle-react-bootstrap.css';

const store = configureStore();
// store.dispatch(loadPosts());


function hashLinkScroll() {
    const { hash } = window.location;
    if (hash !== '') {
        debugger;
        // Push onto callback queue so it runs after the DOM is updated,
        // this is required when navigating from a different page so that
        // the element is rendered on the page before trying to getElementById.
        setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) element.scrollIntoView();
        }, 0);
    }
}

render (
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={routes}
            onUpdate={hashLinkScroll}/>
    </Provider>,
    document.getElementById('app')
);
