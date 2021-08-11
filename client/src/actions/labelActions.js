import LabelRequest from '../requests/labelRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const LabelActionsTypes = {
    LABEL_GET_REQUEST: 'LABEL_GET_REQUEST',
    LABEL_GET_REQUEST_SUCCESS: 'LABEL_GET_REQUEST_SUCCESS',
    LABEL_GET_REQUEST_ERROR: 'LABEL_GET_REQUEST_ERROR',

    LABEL_POST_REQUEST: 'LABEL_POST_REQUEST',
    LABEL_POST_REQUEST_SUCCESS: 'LABEL_POST_REQUEST_SUCCESS',
    LABEL_POST_REQUEST_ERROR: 'LABEL_POST_REQUEST_ERROR',
};
//post label
export function postBegin() {
    return {
        type: LabelActionsTypes.LABEL_POST_REQUEST
    };
}

export function posttSuccess(data) {
    return {
        type: LabelActionsTypes.LABEL_POST_REQUEST_SUCCESS,
        data
    };
}

export function postError() {
    return {
        type: LabelActionsTypes.LABEL_POST_REQUEST_ERROR,
    };
}

// Request gets
export function postLabel() {
    return dispatch => {
        dispatch(postBegin());

        return LabelRequest.postLabel()
            .then(response => responseToJson(response))
            .then(json => dispatch(postSuccess(json)))
            .catch(error => {
                dispatch(postError());
                return globalErrorHandler(error);
            });
    };
}



//getlabel
export function getBegin() {
    return {
        type: LabelActionsTypes.LABEL_GET_REQUEST
    };
}

export function getSuccess(data) {
    return {
        type: LabelActionsTypes.LABEL_GET_REQUEST_SUCCESS,
        data
    };
}

export function getError() {
    return {
        type: LabelActionsTypes.LABEL_GET_REQUEST_ERROR,
    };
}

// Request gets
export function getLabel() {
    return dispatch => {
        dispatch(getBegin());

        return LabelRequest.getLabel()
            .then(response => responseToJson(response))
            .then(json => dispatch(getSuccess(json)))
            .catch(error => {
                dispatch(getError());
                return globalErrorHandler(error);
            });
    };
}

