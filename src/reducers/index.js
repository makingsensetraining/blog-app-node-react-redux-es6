import {combineReducers} from 'redux';
import posts from './blogReducer';

const rootReducer = combineReducers({
    posts
});

export default rootReducer;
