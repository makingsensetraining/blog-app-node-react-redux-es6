import {combineReducers} from 'redux';
import todos from './todoReducer';

const rootReducer = combineReducers({
    todos
});

export default rootReducer;
