import {combineReducers} from 'redux';
import {postsData, post} from './blogReducer';

const rootReducer = combineReducers({
    postsData,
    post
});

export default rootReducer;
