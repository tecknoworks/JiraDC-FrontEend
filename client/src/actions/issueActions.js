import IssueRequest from '../requests/issueRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const IssueActionsTypes = {
    ISSUE_GET_REQUEST: 'ISSUE_GET_REQUEST',
    ISSUE_GET_REQUEST_SUCCESS: 'ISSUE_GET_REQUEST_SUCCESS',
    ISSUE_GET_REQUEST_ERROR: 'ISSUE_GET_REQUEST_ERROR',
};
//getprojects
export function getBegin() {
    return {
        type: IssueActionsTypes.ISSUE_GET_REQUEST
    };
}

export function getSuccess(data) {
    return {
        type: IssueActionsTypes.ISSUE_GET_REQUEST_SUCCESS,
        data
    };
}

export function getError() {
    return {
        type: IssueActionsTypes.ISSUE_GET_REQUEST_ERROR,
    };
}

// Request gets
export function getIssue() {
    return dispatch => {
        dispatch(getBegin());

        return IssueRequest.getIssue()
            .then(response => responseToJson(response))
            .then(json => dispatch(getSuccess(json)))
            .catch(error => {
                dispatch(getError());
                return globalErrorHandler(error);
            });
    };
}

