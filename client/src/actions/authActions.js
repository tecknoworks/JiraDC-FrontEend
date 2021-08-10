import AuthRequest from '../requests/authRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export function getCurrentUser(){
    
}

export const AuthActionsTypes = {
    AUTH_REGISTER_REQUEST: 'AUTH_REGISTER_REQUEST',
    AUTH_REGISTER_REQUEST_SUCCESS: 'AUTH_REGISTER_REQUEST_SUCCESS',
    AUTH_REGISTER_REQUEST_ERROR: 'AUTH_REGISTER_REQUEST_ERROR',

    AUTH_LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
    AUTH_LOGIN_REQUEST_SUCCESS: 'AUTH_LOGIN_REQUEST_SUCCESS',
    AUTH_LOGIN_REQUEST_ERROR: 'AUTH_LOGIN_REQUEST_ERROR',

    AUTH_LOGOUT_REQUEST: 'AUTH_LOGOUT_REQUEST',
    AUTH_LOGOUT_REQUEST_SUCCESS: 'AUTH_LOGOUT_REQUEST_SUCCESS',
    AUTH_LOGOUT_REQUEST_ERROR: 'AUTH_LOGOUT_REQUEST_ERROR',

    AUTH_GETUSERS_REQUEST: 'AUTH_GETUSERS_REQUEST',
    AUTH_GETUSERS_REQUEST_SUCCESS: 'AUTH_GETUSERS_REQUEST_SUCCESS',
    AUTH_GETUSERS_REQUEST_ERROR: 'AUTH_GETUSERS_REQUEST_ERROR',
};

export function registerBegin() {
    return {
        type: AuthActionsTypes.AUTH_REGISTER_REQUEST
    };
}

export function registerSuccess(data) {
    return {
        type: AuthActionsTypes.AUTH_REGISTER_REQUEST_SUCCESS,
        data
    };
}

export function registerError() {
    return {
        type: AuthActionsTypes.AUTH_REGISTER_REQUEST_ERROR,
    };
}

// Request Posts
export function register(data) {
    return dispatch => {
        dispatch(registerBegin());

        return AuthRequest.register(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(registerSuccess(json)))
            .catch(error => {
                dispatch(registerError());
                return globalErrorHandler(error);
            });
    };
}

//login
export function loginBegin() {
    return {
        type: AuthActionsTypes.AUTH_LOGIN_REQUEST
    };
}

export function loginSuccess(data) {
    return {
        type: AuthActionsTypes.AUTH_LOGIN_REQUEST_SUCCESS,
        data
    };
}

export function loginError() {
    return {
        type: AuthActionsTypes.AUTH_LOGIN_REQUEST_ERROR,
    };
}

// Request Posts
export function login(data) {
    return dispatch => {
        dispatch(loginBegin());

        return AuthRequest.login(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(loginSuccess(json)))
            .catch(error => {
                console.log(error)
                dispatch(loginError());
                return globalErrorHandler(error);
            });
    };
}

//LOGOUT
export function logoutBegin() {
    return {
        type: AuthActionsTypes.AUTH_LOGOUT_REQUEST
    };
}

export function logoutSuccess(data) {
    return {
        type: AuthActionsTypes.AUTH_LOGOUT_REQUEST_SUCCESS,
        data
    };
}

export function logoutError() {
    return {
        type: AuthActionsTypes.AUTH_LOGOUT_REQUEST_ERROR,
    };
}

export function logout(data) {
    return dispatch => {
        dispatch(logoutBegin());
        return AuthRequest.logout(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(logoutSuccess(json)))
            .catch(error => {
                console.log(error)
                dispatch(logoutError());
                return globalErrorHandler(error);
            });
    };
}

//GetAllUsers

export function getAllUsersBegin() {
    return {
        type: AuthActionsTypes.AUTH_GETUSERS_REQUEST
    };
}

export function getAllUsersSuccess(data) {
    return {
        type: AuthActionsTypes.AUTH_GETUSERS_REQUEST_SUCCESS,
        data
    };
}

export function getAllUsersError() {
    return {
        type: AuthActionsTypes.AUTH_GETUSERS_REQUEST_ERROR,
    };
}

export function getAllUsers() {
    return dispatch => {
        console.log("hey")
        dispatch(getAllUsersBegin());
        return AuthRequest.getAllUsers()
            .then(response => responseToJson(response))
            .then(json => dispatch(getAllUsersSuccess(json)))
            .catch(error => {
                dispatch(getAllUsersError());
                return globalErrorHandler(error);
            });
    };
}