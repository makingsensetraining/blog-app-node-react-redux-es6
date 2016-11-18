import * as types from '../actions/actionTypes';
import initialState from './initialState';

// export default function blogReducer(state = initialState.posts, action){
//     switch (action.type){
//         case types.LOAD_POST_SUCCESS:
//             debugger;
//             return action.posts;
//
//         case types.CREATE_POST_SUCCESS:
//             return [
//                 ...state,
//                 Object.assign({}, action.post),
//             ];
//
//         case types.GET_POST_SUCCESS:
//             debugger;
//             return action.post;
//
//         default:
//             debugger;
//             return state;
//     }
// }


export const posts = (state = initialState.posts, action) => {
    switch (action.type){
        case types.LOAD_POST_SUCCESS:
            return action.posts;

        case types.CREATE_POST_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.post),
            ];

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

