
import PostRequest from '../requests/postRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const PostActions = {
    REQUEST_POSTS_BY_PAGE: 'REQUEST_POSTS_BY_PAGE',
    REQUEST_POSTS_BY_PAGE_SUCCESS: 'REQUEST_POSTS_BY_PAGE_SUCCESS',
    REQUEST_POSTS_BY_PAGE_ERROR: 'REQUEST_POSTS_BY_PAGE_ERROR',

    ADD_POST: 'ADD_POST',
    ADD_POST_SUCCESS: 'ADD_POST_SUCCESS',
    ADD_POST_ERROR: 'ADD_POST_ERROR',

    REMOVE_POST: 'REMOVE_POST',
    REMOVE_POST_SUCCESS: 'REMOVE_POST_SUCCESS',
    REMOVE_POST_ERROR: 'REMOVE_POST_ERROR'
};

// Request Posts
export function requestPostsByPageBegin() {
    return {
        type: PostActions.REQUEST_POSTS_BY_PAGE
    };
}

export function requestPostsByPageSuccess(posts) {
    return {
        type: PostActions.REQUEST_POSTS_BY_PAGE_SUCCESS,
        posts
    };
}

export function requestPostsByPageError() {
    return {
        type: PostActions.REQUEST_POSTS_BY_PAGE_ERROR,
    };
}

export function requestPostsByPage(pageId) {
    return dispatch => {
        dispatch(requestPostsByPageBegin());

        return PostRequest.fetchPostsByPage(pageId)
            .then(response => responseToJson(response))
            .then(json => dispatch(requestPostsByPageSuccess(json)))
            .catch(error => {
                dispatch(requestPostsByPageError());
                return globalErrorHandler(error);
            });
    };
}

// Add Post
export function addPostBegin() {
    return {
        type: PostActions.ADD_POST
    };
}

export function addPostSuccess(post) {
    return {
        type: PostActions.ADD_POST_SUCCESS,
        post
    };
}

export function addPostError() {
    return {
        type: PostActions.ADD_POST_ERROR,
    };
}

export function addPost(data) {
    return dispatch => {
        dispatch(addPostBegin());

        return PostRequest.addPost(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(addPostSuccess(json)))
            .catch(error => {
                dispatch(addPostError());
                return globalErrorHandler(error);
            });
    };
}

// Remove Post
export function removePostBegin() {
    return {
        type: PostActions.REMOVE_POST
    };
}

export function removePostSuccess() {
    return {
        type: PostActions.REMOVE_POST_SUCCESS,
    };
}

export function removePostError() {
    return {
        type: PostActions.REMOVE_POST_ERROR,
    };
}

export function removePost(id) {
    return dispatch => {
        dispatch(removePostBegin());

        return PostRequest.removePost(id)
            .then(response => responseToJson(response))
            .then(json => dispatch(removePostSuccess()))
            .catch(error => {
                dispatch(removePostError());
                return globalErrorHandler(error);
            });
    };
}