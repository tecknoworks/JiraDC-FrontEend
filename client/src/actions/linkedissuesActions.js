import LinkedIssuesRequest from '../requests/linkedissuesRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const LinkedIssuesActionsTypes = {
    LINKEDISSUES_GET_REQUEST: 'LINKEDISSUES_GET_REQUEST',
    LINKEDISSUES_GET_REQUEST_SUCCESS: 'LINKEDISSUES_GET_REQUEST_SUCCESS',
    LINKEDISSUES_GET_REQUEST_ERROR: 'LINKEDISSUES_GET_REQUEST_ERROR',
};

//getlinkedissues
export function getBegin() {
    return {
        type: LinkedIssuesActionsTypes.LINKEDISSUES_GET_REQUEST
    };
}

export function getSuccess(data) {
    return {
        type: LinkedIssuesActionsTypes.LINKEDISSUES_GET_REQUEST_SUCCESS,
        data
    };
}

export function getError() {
    return {
        type: LinkedIssuesActionsTypes.LINKEDISSUES_GET_REQUEST_ERROR,
    };
}

export function getLinkedIssues() {
    return dispatch => {
        dispatch(getBegin());

        return LinkedIssuesRequest.getLinkedIssues()
            .then(response => responseToJson(response))
            .then(json => dispatch(getSuccess(json)))
            .catch(error => {
                dispatch(getError());
                return globalErrorHandler(error);
            });
    };
}