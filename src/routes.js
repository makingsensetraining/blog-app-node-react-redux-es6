import React from 'react';
import {Route, IndexRoute,Redirect } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import BlogPage from './components/blog/BlogPage';
import NotFound from './components/not_found/NotFound';

export default (
    <Route path="/app" component={App}>
        <IndexRoute component={HomePage}/>
        <Redirect from="/" to="/app" />
        <Route path="/app/blog" component={BlogPage}/>
        <Route path="/app/about" component={AboutPage}/>
        <Route path="*" component={ NotFound } />
    </Route>

);
