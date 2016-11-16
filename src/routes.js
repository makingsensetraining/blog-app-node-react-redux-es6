import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import BlogPage from './components/blog/BlogPage';
import NotFound from './components/not_found/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="blog" component={BlogPage}/>
        <Route path="about" component={AboutPage}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
