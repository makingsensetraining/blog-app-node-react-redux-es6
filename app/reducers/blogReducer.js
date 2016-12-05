import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const posts = (state = initialState.posts, action) => {
    switch (action.type){
        case types.LOAD_POST_SUCCESS:
            return action.posts;

        case types.CREATE_POST_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.post),
            ];

        case types.DELETE_POST_SUCCESS:
            return [
                ...state.filter(post => post.id !== action.postId)
            ];

        case types.UPDATE_POST_SUCCESS:
            return [
                ...state.filter(post => post.id !== action.post.id),
                Object.assign({}, action.post)
            ].sort((a, b) => { //After the array is with all the elements, we sort by postId alphabetically
                return a.id - b.id;
            });

        default:
            return state;
    }
};

export const post = (state = initialState.post, action) => {
    switch (action.type){
        case types.GET_POST_SUCCESS:
            return action.post;

        default:
            return state;
    }
};

export const count = (state = initialState.count, action) => {
    switch (action.type){
        case types.LOAD_POST_SUCCESS:
            return action.count;

        default:
            return state;
    }
};

