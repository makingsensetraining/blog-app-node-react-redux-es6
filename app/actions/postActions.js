import * as types from './actionTypes';
import * as endpoints from './apiEndpoints';
import fetch from 'isomorphic-fetch';

export function loadPostSuccess(posts, paginator){
    return { type: types.LOAD_POST_SUCCESS, posts: posts, paginator: paginator };
}

export function createPostSuccess(post){
    return { type: types.CREATE_POST_SUCCESS, post };
}

export function getPostSuccess(post){
    return { type: types.GET_POST_SUCCESS, post };
}

export function deletePostSuccess(postId){
    return { type: types.DELETE_POST_SUCCESS, postId };
}

export function updatePostSuccess(post){
    return { type: types.UPDATE_POST_SUCCESS, post };
}

export function loadPosts(page, limit, filter, sort, sortDir){
    return dispatch => {

        return fetch(endpoints.GET_POSTS + `/?page=${page}&limit=${limit}&filter=${filter}&sort=${sort}&sortDir=${sortDir}`)
            .then(response => response.json())
            .then(response => dispatch(loadPostSuccess(response.posts, response.paginator)))
            .catch(error => {
                throw(error);
            });
    };
}

export function createPost(post){
    return (dispatch, getState) => {
        debugger;
        return fetch(endpoints.POST_POSTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: post
            })
        }).then(response => response.json())
          .then(postSaved => {
              dispatch(createPostSuccess(postSaved));
              debugger;
              dispatch(loadPosts());
          })
          .catch(error => {
              throw(error);
          });
    };
}

export function updatePost(post){
    return (dispatch, getState) => {

        return fetch(endpoints.PUT_POST, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: post
            })
        }).then(response => response.json())
            .then(postUpdated => dispatch(updatePostSuccess(postUpdated)))
            .catch(error => {
                throw(error);
            });
    };
}


export function getPost(id){
    return (dispatch, getState) => {
        const url = endpoints.GET_POST + `/${id}`;

        return fetch(url)
            .then(response => response.json())
            .then(post => dispatch(getPostSuccess(post)))
            .catch(error => {
                throw(error);
            });
    };
}

export function deletePost(id){
    return (dispatch, getState) => {
        const url = endpoints.DELETE_POST + `/${id}`;

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(post => dispatch(deletePostSuccess(post.id)))
            .catch(error => {
                throw(error);
            });
    };
}
