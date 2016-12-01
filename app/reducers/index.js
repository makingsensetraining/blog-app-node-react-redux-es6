import {combineReducers} from 'redux';
import {count, posts, post} from './blogReducer';

const rootReducer = combineReducers({
    count,
    posts,
    post
});

export default rootReducer;
