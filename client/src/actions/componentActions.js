import ComponentRequest from '../requests/componentRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const ComponentActionsTypes = {
    COMPONENT_GET_REQUEST: 'COMPONENT_GET_REQUEST',
    COMPONENT_GET_REQUEST_SUCCESS: 'COMPONENT_GET_REQUEST_SUCCESS',
    COMPONENT_GET_REQUEST_ERROR: 'COMPONENT_GET_REQUEST_ERROR',
};



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

// Request gets
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