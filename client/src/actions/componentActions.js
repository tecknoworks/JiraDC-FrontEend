import ComponentRequest from '../requests/componentRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const ComponentActionsTypes = {
    COMPONENT_POST_REQUEST: 'COMPONENT_POST_REQUEST',
    COMPONENT_POST_REQUEST_SUCCESS: 'COMPONENT_POST_REQUEST_SUCCESS',
    COMPONENT_POST_REQUEST_ERROR: 'COMPONENT_POST_REQUEST_ERROR',

    COMPONENT_GET_REQUEST: 'COMPONENT_GET_REQUEST',
    COMPONENT_GET_REQUEST_SUCCESS: 'COMPONENT_GET_REQUEST_SUCCESS',
    COMPONENT_GET_REQUEST_ERROR: 'COMPONENT_GET_REQUEST_ERROR',

    COMPONENT_UPDATE_REQUEST: 'COMPONENT_UPDATE_REQUEST',
    COMPONENT_UPDATE_REQUEST_SUCCESS: 'COMPONENT_UPDATE_REQUEST_SUCCESS',
    COMPONENT_UPDATE_REQUEST_ERROR: 'COMPONENT_UPDATE_REQUEST_ERROR',

    COMPONENT_USER_UPDATE_REQUEST_SUCCESS: 'COMPONENT_USER_UPDATE_REQUEST_SUCCESS',
};

//postComponent

export function postBegin() {
    return {
        type: ComponentActionsTypes.COMPONENT_POST_REQUEST
    };
}

export function postSuccess(data) {
    return {
        type: ComponentActionsTypes.COMPONENT_POST_REQUEST_SUCCESS,
        data
    };
}

export function postError() {
    return {
        type: ComponentActionsTypes.COMPONENT_POST_REQUEST_ERROR,
    };
}

export function postComponent(data) {
    return dispatch => {
        dispatch(postBegin());

        return ComponentRequest.postComponent(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(postSuccess(json)))
            .catch(error => {
                dispatch(postError());
                return globalErrorHandler(error);
            });
    };
}

//getComponent
export function getBegin() {
    return {
        type: ComponentActionsTypes.COMPONENT_GET_REQUEST
    };
}

export function getSuccess(data) {
    return {
        type: ComponentActionsTypes.COMPONENT_GET_REQUEST_SUCCESS,
        data
    };
}

export function getError() {
    return {
        type: ComponentActionsTypes.COMPONENT_GET_REQUEST_ERROR,
    };
}
export function getComponent() {
    return dispatch => {
        dispatch(getBegin());

        return ComponentRequest.getComponent()
            .then(response => responseToJson(response))
            .then(json => dispatch(getSuccess(json)))
            .catch(error => {
                dispatch(getError());
                return globalErrorHandler(error);
            });
    };
}

//updateComponent

export function updateComponentBegin() {
    return {
        type: ComponentActionsTypes.COMPONENT_UPDATE_REQUEST
    };
}

export function updateComponentSuccess(data) {
    return {
        type: ComponentActionsTypes.COMPONENT_UPDATE_REQUEST_SUCCESS,
        data
    };
}

export function updateComponentError() {
    return {
        type: ComponentActionsTypes.COMPONENT_UPDATE_REQUEST_ERROR,
    };
}
export function updateComponent(data) {
    return dispatch => {
        dispatch(updateComponentBegin());

        return ComponentRequest.updateComponent(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(updateComponentSuccess(json)))
            .catch(error => {
                dispatch(updateComponentError());
                return globalErrorHandler(error);
            });
    }; 
}
export function userUpdateComponent(component) {
    return {
        type: ComponentActionsTypes.COMPONENT_USER_UPDATE_REQUEST_SUCCESS,
        data: component
    };
}

