import WorkItemRequest from '../requests/workItemRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const WorkItemActionsTypes = {
    WORKITEM_GET_REQUEST: 'WORKITEM_GET_REQUEST',
    WORKITEM_GET_REQUEST_SUCCESS: 'WORKITEM_GET_REQUEST_SUCCESS',
    WORKITEM_GET_REQUEST_ERROR: 'WORKITEM_GET_REQUEST_ERROR',

    WORKITEM_POST_REQUEST: 'WORKITEM_POST_REQUEST',
    WORKITEM_POST_REQUEST_SUCCESS: 'WORKITEM_POST_REQUEST_SUCCESS',
    WORKITEM_POST_REQUEST_ERROR: 'WORKITEM_POST_REQUEST_ERROR',

    WORKITEM_GET_EPIC_REQUEST: 'WORKITEM_GET_EPIC_REQUEST',
    WORKITEM_GET_EPIC_REQUEST_SUCCESS: 'WORKITEM_GET_EPIC_REQUEST_SUCCESS',
    WORKITEM_GET_EPIC_REQUEST_ERROR: 'WORKITEM_GET_EPIC_REQUEST_ERROR',
};
//post workitem
export function postWorkItemBegin() {
    return {
        type: WorkItemActionsTypes.WORKITEM_POST_REQUEST
    };
}

export function postWorkItemSuccess(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_POST_REQUEST_SUCCESS,
        data
    };
}

export function postWorkItemError() {
    return {
        type: WorkItemActionsTypes.WORKITEM_POST_REQUEST_ERROR,
    };
}

export function postWorkItem(data) {
    return dispatch => {
        dispatch(postWorkItemBegin());

        return WorkItemRequest.postWorkItem(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(postWorkItemSuccess(json)))
            .catch(error => {
                dispatch(postWorkItemError());
                return globalErrorHandler(error);
            });
    };
}
//getWorkItem
export function getWorkItemBegin() {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_REQUEST
    };
}

export function getWorkItemSuccess(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_REQUEST_SUCCESS,
        data
    };
}

export function getWorkItemError() {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_REQUEST_ERROR,
    };
}

export function getWorkItem() {
    return dispatch => {
        dispatch(getWorkItemBegin());

        return WorkItemRequest.getWorkItem()
            .then(response => responseToJson(response))
            .then(json => dispatch(getWorkItemSuccess(json)))
            .catch(error => {
                dispatch(getWorkItemError());
                return globalErrorHandler(error);
            });
    };
}

//getEpicWorkItem
export function getWorkItemEpicBegin() {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_EPIC_REQUEST
    };
}

export function getWorkItemEpicSuccess(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_EPIC_REQUEST_SUCCESS,
        data
    };
}

export function getWorkItemEpicError() {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_EPIC_REQUEST_ERROR,
    };
}

export function getWorkItemEpic() {
    return dispatch => {
        dispatch(getWorkItemEpicBegin());

        return WorkItemRequest.getWorkItemEpic()
            .then(response => responseToJson(response))
            .then(json => dispatch(getWorkItemEpicSuccess(json)))
            .catch(error => {
                dispatch(getWorkItemEpicError());
                return globalErrorHandler(error);
            });
    };
}

