import {combineReducers} from 'redux';
import {posts, post} from './blogReducer';

const rootReducer = combineReducers({
    posts,
    post
});

export default rootReducer;
