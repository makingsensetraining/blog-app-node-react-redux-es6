import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function blogReducer(state = initialState.posts, action){
    switch (action.type){
        case types.LOAD_POST_SUCCESS:
            return action.posts;

        default:
            return state;
    }
}
