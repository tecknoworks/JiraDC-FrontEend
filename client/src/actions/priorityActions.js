import PriorityRequest from '../requests/priorityRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const PriorityActionsTypes = {
    PRIORITY_GET_REQUEST: 'PPRIORITY_GET_REQUEST',
    PRIORITY_GET_REQUEST_SUCCESS: 'PRIORITY_GET_REQUEST_SUCCESS',
    PRIORITY_GET_REQUEST_ERROR: 'PRIORITY_GET_REQUEST_ERROR',
};



//getpriority
export function getBegin() {
    return {
        type: PriorityActionsTypes.PRIORITY_GET_REQUEST
    };
}

export function getSuccess(data) {
    return {
        type: PriorityActionsTypes.PRIORITY_GET_REQUEST_SUCCESS,
        data
    };
}

export function getError() {
    return {
        type: PriorityActionsTypes.PRIORITY_GET_REQUEST_ERROR,
    };
}

// Request gets
export function getPriority() {
    return dispatch => {
        dispatch(getBegin());

        return PriorityRequest.getPriority()
            .then(response => responseToJson(response))
            .then(json => dispatch(getSuccess(json)))
            .catch(error => {
                dispatch(getError());
                return globalErrorHandler(error);
            });
    };
}