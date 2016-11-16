import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';

export function loadPostSuccess(posts){
    return { type: types.LOAD_POST_SUCCESS, posts };
}

export function createPostSuccess(post){
    return { type: types.CREATE_POST_SUCCESS, post };
}

export function updatePostSuccess(post){
    return { type: types.UPDATE_POST_SUCCESS, post };
}

export function loadPosts(){
    return dispatch => {

        return fetch('/api/myPosts')
            .then(response => response.json())
            .then(json => dispatch(loadPostSuccess(json)))
            .catch(error => {
                throw(error);
            });
    };
}

export function createPost(post){
    return (dispatch, getState) => {
        return blogAPI.savePost(post).then(postSaved => {
            post.id ? dispatch(updatePostSuccess(postSaved)) :
                dispatch(createPostSuccess(postSaved));
        }).catch(error => {
            throw(error);
        })
    }
}




/*
    For using REAL Api Calls
    -> Example http call from original doc: http://redux.js.org/docs/advanced/AsyncActions.html
    using thunk and fetch (needs polyfill)


function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(`http://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
    }
}

// Other example:
 return fetch('http://<apiURL>')
     .then(response => response.json())
     .then(json => console.log(json));

// Fetch using Post JSON:
 fetch('/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
    })
 })
*/
