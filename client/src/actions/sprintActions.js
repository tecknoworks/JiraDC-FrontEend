import SprintRequest from '../requests/sprintRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const SprintActionsTypes = {
    SPRINT_GET_REQUEST: 'SPRINT_GET_REQUEST',
    SPRINT_GET_REQUEST_SUCCESS: 'SPRINT_GET_REQUEST_SUCCESS',
    SPRINT_GET_REQUEST_ERROR: 'SPRINT_GET_REQUEST_ERROR',

    SPRINT_POST_REQUEST: 'SPRINT_POST_REQUEST',
    SPRINT_POST_REQUEST_SUCCESS: 'SPRINT_POST_REQUEST_SUCCESS',
    SPRINT_POST_REQUEST_ERROR: 'SPRINT_POST_REQUEST_ERROR',

    SPRINT_UPDATE_REQUEST: 'SPRINT_UPDATE_REQUEST',
    SPRINT_UPDATE_REQUEST_SUCCESS: 'SPRINT_UPDATE_REQUEST_SUCCESS',
    SPRINT_UPDATE_REQUEST_ERROR: 'SPRINT_UPDATE_REQUEST_ERROR',

    SPRINT_USER_UPDATE_REQUEST_SUCCESS: 'SPRINT_USER_UPDATE_REQUEST_SUCCESS',
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
export function getSprint(payload) {
    return dispatch => {
        dispatch(getBegin());

        return SprintRequest.getSprint(payload)
            .then(response => responseToJson(response))
            .then(json => dispatch(getSuccess(json)))
            .catch(error => {
                dispatch(getError());
                return globalErrorHandler(error);
            });
    };
}

//postSprint
export function postBegin() {
    return {
        type: SprintActionsTypes.SPRINT_POST_REQUEST
    };
}

export function postSuccess(data) {
    return {
        type: SprintActionsTypes.SPRINT_POST_REQUEST_SUCCESS,
        data
    };
}

export function postError() {
    return {
        type: SprintActionsTypes.SPRINT_POST_REQUEST_ERROR,
    };
}

export function postSprint(data) {
    return dispatch => {
        dispatch(postBegin());

        return SprintRequest.postSprint(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(postSuccess(json)))
            .catch(error => {
                dispatch(postError());
                return globalErrorHandler(error);
            });
    };
}
//updateSprint 

export function updateSprintBegin() {
    return {
        type: SprintActionsTypes.SPRINT_UPDATE_REQUEST
    };
}

export function updateSprintSuccess(data) {
    return {
        type: SprintActionsTypes.SPRINT_UPDATE_REQUEST_SUCCESS,
        data
    };
}

export function updateSprintError() {
    return {
        type: SprintActionsTypes.SPRINT_UPDATE_REQUEST_ERROR,
    };
}
export function updateSprint(data) {
    return dispatch => {
        dispatch(updateSprintBegin());

        return SprintRequest.updateSprint(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(updateSprintSuccess(json)))
            .catch(error => {
                dispatch(updateSprintError());
                return globalErrorHandler(error);
            });
    }; 
}
export function userUpdateSprint(sprint) {
    debugger
    return {
        type: SprintActionsTypes.SPRINT_USER_UPDATE_REQUEST_SUCCESS,
        data: sprint
    };
}
