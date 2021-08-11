import SprintRequest from '../requests/sprintRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const SprintActionsTypes = {
    SPRINT_GET_REQUEST: 'SPRINT_GET_REQUEST',
    SPRINT_GET_REQUEST_SUCCESS: 'SPRINT_GET_REQUEST_SUCCESS',
    SPRINT_GET_REQUEST_ERROR: 'SPRINT_GET_REQUEST_ERROR',
};



//getsprint
export function getBegin() {
    return {
        type: SprintActionsTypes.SPRINT_GET_REQUEST
    };
}

export function getSuccess(data) {
    return {
        type: SprintActionsTypes.SPRINT_GET_REQUEST_SUCCESS,
        data
    };
}

export function getError() {
    return {
        type: SprintActionsTypes.SPRINT_GET_REQUEST_ERROR,
    };
}

// Request gets
export function getSprint() {
    return dispatch => {
        dispatch(getBegin());

        return SprintRequest.getSprint()
            .then(response => responseToJson(response))
            .then(json => dispatch(getSuccess(json)))
            .catch(error => {
                dispatch(getError());
                return globalErrorHandler(error);
            });
    };
}