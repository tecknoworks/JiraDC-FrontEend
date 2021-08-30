import WorkItemRequest from '../requests/workItemRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const WorkItemActionsTypes = {
    WORKITEM_GET_REQUEST: 'WORKITEM_GET_REQUEST',
    WORKITEM_GET_REQUEST_SUCCESS: 'WORKITEM_GET_REQUEST_SUCCESS',
    WORKITEM_GET_REQUEST_ERROR: 'WORKITEM_GET_REQUEST_ERROR',

    WORKITEM_GET_PROJECT_REQUEST: 'WORKITEM_GET_PROJECT_REQUEST',
    WORKITEM_GET_PROJECT_REQUEST_SUCCESS: 'WORKITEM_GET_PROJECT_REQUEST_SUCCESS',
    WORKITEM_GET_PROJECT_REQUEST_ERROR: 'WORKITEM_GET_PROJECT_REQUEST_ERROR',

    WORKITEM_GET_BY_ID_REQUEST: 'WORKITEM_GET_BY_ID_REQUEST',
    WORKITEM_GET_BY_ID_REQUEST_SUCCESS: 'WORKITEM_GET_BY_ID_REQUEST_SUCCESS',
    WORKITEM_GET_BY_ID_REQUEST_ERROR: 'WORKITEM_GET_BY_ID_REQUEST_ERROR',

    WORKITEM_POST_REQUEST: 'WORKITEM_POST_REQUEST',
    WORKITEM_POST_REQUEST_SUCCESS: 'WORKITEM_POST_REQUEST_SUCCESS',
    WORKITEM_POST_REQUEST_ERROR: 'WORKITEM_POST_REQUEST_ERROR',

    WORKITEM_UPDATE_REQUEST: 'WORKITEM_UPDATE_REQUEST',
    WORKITEM_UPDATE_REQUEST_SUCCESS: 'WORKITEM_UPDATE_REQUEST_SUCCESS',
    WORKITEM_UPDATE_REQUEST_ERROR: 'WORKITEM_UPDATE_REQUEST_ERROR',

    WORKITEM_USER_UPDATE_REQUEST_SUCCESS: 'WORKITEM_USER_UPDATE_REQUEST_SUCCESS',

    WORKITEM_GET_EPIC_REQUEST: 'WORKITEM_GET_EPIC_REQUEST',
    WORKITEM_GET_EPIC_REQUEST_SUCCESS: 'WORKITEM_GET_EPIC_REQUEST_SUCCESS',
    WORKITEM_GET_EPIC_REQUEST_ERROR: 'WORKITEM_GET_EPIC_REQUEST_ERROR',

    WORKITEM_LOCAL_UPDATE_SPRINT_ITEMS: "WORKITEM_LOCAL_UPDATE_SPRINT_ITEMS",

    WORKITEM_CHANGE_POSITION_REQUEST_SUCCESS: 'WORKITEM_CHANGE_POSITION_REQUEST_SUCCESS',

    WORKITEM_CHANGE_POSITION_BT_SPRINTS_REQUEST_SUCCESS: 'WORKITEM_CHANGE_POSITION_BT_SPRINTS_REQUEST_SUCCESS',

    //active sprints
    WORKITEM_LOCAL_UPDATE_STATUS_ITEMS:"WORKITEM_LOCAL_UPDATE_STATUS_ITEMS",

    WORKITEM_CHANGE_POSITION_STATUS_REQUEST_SUCCESS: 'WORKITEM_CHANGE_POSITION_STATUS_REQUEST_SUCCESS',

    WORKITEM_CHANGE_STATUS_REQUEST_SUCCESS:"WORKITEM_CHANGE_STATUS_REQUEST_SUCCESS",

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

//getWorkItemProjectId
export function getWorkItemProjectBegin() {
    console.log("begin")
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_PROJECT_REQUEST
    };
}

export function getWorkItemProjectSuccess(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_PROJECT_REQUEST_SUCCESS,
        data
    };
}

export function getWorkItemProjectError() {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_PROJECT_REQUEST_ERROR,
    };
}

export function getWorkItemProject(data) {
    console.log(data)
    debugger
    return dispatch => {
        debugger
        dispatch(getWorkItemProjectBegin());
        return WorkItemRequest.getWorkItemProject(data)
            .then(response => responseToJson(response))
            .then(json =>  dispatch(getWorkItemProjectSuccess(json)))
            .catch(error => {
                dispatch(getWorkItemProjectError());
                return globalErrorHandler(error);
            });
    };
}

export function localUpdateWorkItemSprintItems(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_LOCAL_UPDATE_SPRINT_ITEMS,
        data: data
    };
}
export function changeItemPositionSucces(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_CHANGE_POSITION_REQUEST_SUCCESS,
        data: data
    };
}
export function changeItemPositionBTSprintsSucces(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_CHANGE_POSITION_BT_SPRINTS_REQUEST_SUCCESS,
        data: data
    };
}

export function changeItemPosition(data) {
    return dispatch => {
        // dispatch(getWorkItemProjectBegin());
        return WorkItemRequest.changeItemPosition(data)
            .then(response => responseToJson(response))
            .then(json =>  dispatch(changeItemPositionSucces(json)))
            .catch(error => {
                // dispatch(getWorkItemProjectError());
                return globalErrorHandler(error);
            });
    };
}
export function changeItemPositionBTSprints(data) {
    return dispatch => {
        // dispatch(getWorkItemProjectBegin());
        return WorkItemRequest.changeItemPositionBTSprints(data)
            .then(response => responseToJson(response))
            .then(json =>  dispatch(changeItemPositionBTSprintsSucces(json)))
            .catch(error => {
                // dispatch(getWorkItemProjectError());
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


//getworkItemById
export function getWorkItemByIdBegin() {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_BY_ID_REQUEST
    };
}

export function getWorkItemByIdSuccess(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_BY_ID_REQUEST_SUCCESS,
        data
    };
}

export function getWorkItemByIdError() {
    return {
        type: WorkItemActionsTypes.WORKITEM_GET_BY_ID_REQUEST_ERROR,
    };
}

export function getWorkItemById(data) {
    return dispatch => {
        dispatch(getWorkItemByIdBegin());
        return WorkItemRequest.getWorkItemById(data)
            .then(response => responseToJson(response))
            .then(json =>  dispatch(getWorkItemByIdSuccess(json)))
            .catch(error => {
                dispatch(getWorkItemByIdError());
                return globalErrorHandler(error);
            });
    };
}


//update work item
export function updateWorkItemBegin() {
    return {
        type: WorkItemActionsTypes.WORKITEM_UPDATE_REQUEST
    };
}

export function updateWorkItemSuccess(data,refreshProject) {
    debugger
//    if (refreshProject && refreshProject.isRefresh) {
//         getWorkItemProject({id:project_id});
//    }
    return {
        type: WorkItemActionsTypes.WORKITEM_UPDATE_REQUEST_SUCCESS,
        data
    };
}

export function updateWorkItemError() {
    return {
        type: WorkItemActionsTypes.WORKITEM_UPDATE_REQUEST_ERROR,
    };
}
export function updateWorkItem(data,refreshProject) {
    return dispatch => {
        dispatch(updateWorkItemBegin());

        return WorkItemRequest.updateWorkItem(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(updateWorkItemSuccess(json,refreshProject)))
            .catch(error => {
                dispatch(updateWorkItemError());
                return globalErrorHandler(error);
            });
    }; 
}
export function userUpdateWorkItem(WorkItem) {
    return {
        type: WorkItemActionsTypes.WORKITEM_USER_UPDATE_REQUEST_SUCCESS,
        data: WorkItem
    };
}

//active sprints
export function localUpdateWorkItemStatusItems(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_LOCAL_UPDATE_STATUS_ITEMS,
        data: data
    };
}

export function changeItemPositionStatusSuccess(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_CHANGE_POSITION_STATUS_REQUEST_SUCCESS,
        data: data
    };
}
export function changeItemPositionStatus(data) {
    return dispatch => {
        // dispatch(getWorkItemProjectBegin());
        return WorkItemRequest.changeItemPositionStatus(data)
            .then(response => responseToJson(response))
            .then(json =>  dispatch(changeItemPositionStatusSucces(json)))
            .catch(error => {
                // dispatch(getWorkItemProjectError());
                return globalErrorHandler(error);
            });
    };
}

export function changeItemStatusSuccess(data) {
    return {
        type: WorkItemActionsTypes.WORKITEM_CHANGE_STATUS_REQUEST_SUCCESS,
        data: data
    };
}
export function changeItemStatus(data) {
    return dispatch => {
        // dispatch(getWorkItemProjectBegin());
        return WorkItemRequest.changeItemStatus(data)
            .then(response => responseToJson(response))
            .then(json =>  dispatch(changeItemStatusSuccess(json)))
            .catch(error => {
                // dispatch(getWorkItemProjectError());
                return globalErrorHandler(error);
            });
    };
}