import * as types from './actionTypes';
import * as endpoints from './apiEndpoints';
import fetch from 'isomorphic-fetch';

export function loadPostSuccess(posts){
    return { type: types.LOAD_POST_SUCCESS, posts };
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

export function loadPosts(){
    return dispatch => {

        return fetch(endpoints.GET_POSTS)
            .then(response => response.json())
            .then(posts => dispatch(loadPostSuccess(posts)))
            .catch(error => {
                throw(error);
            });
    };
}

export function createPost(post){
    return (dispatch, getState) => {

        return fetch(endpoints.POST_POSTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: post
            })
        }).then(response => response.json())
          .then(postSaved => dispatch(createPostSuccess(postSaved)))
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
        const url = endpoints.GET_POST + '/' + id;

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
        const url = endpoints.DELETE_POST + '/' + id;

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(resp => dispatch(deletePostSuccess(resp.postId)))
            .catch(error => {
                throw(error);
            });
    };
}
