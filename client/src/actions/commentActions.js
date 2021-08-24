import CommentRequest from '../requests/commentRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const CommentActionsTypes = {
    COMMENT_POST_REQUEST: 'COMMENT_POST_REQUEST',
    COMMENT_POST_REQUEST_SUCCESS: 'COMMENT_POST_REQUEST_SUCCESS',
    COMMENT_POST_REQUEST_ERROR: 'COMMENT_POST_REQUEST_ERROR',

    COMMENT_PUT_REQUEST: 'COMMENT_PUT_REQUEST',
    COMMENT_PUT_REQUEST_SUCCESS: 'COMMENT_PUT_REQUEST_SUCCESS',
    COMMENT_PUT_REQUEST_ERROR: 'COMMENT_PUT_REQUEST_ERROR',
};

//postComment
export function postCommentBegin() {
    return {
        type: CommentActionsTypes.COMMENT_POST_REQUEST
    };
}

export function postCommentSuccess(data) {
    return {
        type: CommentActionsTypes.COMMENT_POST_REQUEST_SUCCESS,
        data
    };
}

export function postCommentError() {
    return {
        type: CommentActionsTypes.COMMENT_POST_REQUEST_ERROR,
    };
}

export function postComment(data) {
    return dispatch => {
        dispatch(postCommentBegin());

        return CommentRequest.postComment(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(postCommentSuccess(json)))
            .catch(error => {
                dispatch(postCommentError());
                return globalErrorHandler(error);
            });
    };
}

//pupComment
export function putCommentBegin() {
    return {
        type: CommentActionsTypes.COMMENT_PUT_REQUEST
    };
}

export function putCommentSuccess(data) {
    return {
        type: CommentActionsTypes.COMMENT_PUT_REQUEST_SUCCESS,
        data
    };
}

export function putCommentError() {
    return {
        type: CommentActionsTypes.COMMENT_PUT_REQUEST_ERROR,
    };
}

export function putComment(data) {
    return dispatch => {
        dispatch(putCommentBegin());

        return CommentRequest.putComment(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(putCommentSuccess(json)))
            .catch(error => {
                dispatch(putCommentError());
                return globalErrorHandler(error);
            });
    };
}