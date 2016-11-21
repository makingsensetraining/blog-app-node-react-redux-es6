import React from 'react';
import {Route, IndexRoute,Redirect } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import BlogPage from './components/blog-list/BlogPage';
import DetailPostPage from './components/blog-detail/DetailPostPage';
import ManagePostPage from './components/blog-form/ManagePostPage';
import NotFound from './components/not_found/NotFound';

export default (
    <Route path="/app" component={App}>
        <IndexRoute component={HomePage}/>
        <Redirect from="/" to="/app" />
        <Route path="/app/blog" component={BlogPage}/>
        <Route path="/app/post-create" component={ManagePostPage}/>
        <Route path="/app/post-detail/:id" component={DetailPostPage}/>
        <Route path="/app/about" component={AboutPage}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
