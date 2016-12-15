import React from 'react';
import {Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import BlogGridPage from './components/blog-grid/BlogGridPage';
// import DetailPostPage from './components/blog-detail/DetailPostPage';
// import CreatePostPageModal from './components/blog-form/CreatePostModal';
// import EditPostPage from './components/blog-form/EditPostPage';
import NotFound from './components/not_found/NotFound';

import HashLinkPage from './components/common/HashLinkPage';

export default (
    <Route path="/app" component={App}>
        <Redirect from="/" to="/app" />
        <IndexRoute component={HomePage}/>

        <Route path="/app/blog-grid" component={BlogGridPage}/>

        {/*<Route path="/app/post-create" component={CreatePostPageModal}/>*/}
        {/*<Route path="/app/post-edit/:id" component={EditPostPage}/>*/}
        {/*<Route path="/app/post-detail/:id" component={DetailPostPage}/>*/}

        <Route path="/app/about" component={AboutPage}/>
        <Route path="/app/:dynamicRouteBecasueWhyNot" component={HashLinkPage} />
        <Route path="*" component={NotFound}/>
    </Route>
);
