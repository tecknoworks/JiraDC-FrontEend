import { AuthActionsTypes } from '../actions';

const registerInitialState = {
    loading: false,
    user: {
        username: 'damaris',
        email:'dam@yahooo.com',
        password: 'catalina'
    }
}
const loginInitialState = {
    loading: false,
    user: {
        email:'dam@yahooo.com',
        password: 'catalina'
    }
}
export function register(state = registerInitialState, action) {
    switch (action.type) {
        case AuthActionsTypes.AUTH_REGISTER_REQUEST:
            return { ...state, loading: true };
        case AuthActionsTypes.AUTH_REGISTER_REQUEST_SUCCESS:
            return { ...state, loading: false };
        case AuthActionsTypes.AUTH_REGISTER_REQUEST_ERROR:
            return { ...state , loading: false };
    }

    return state;
}
//login
export function login(state = loginInitialState, action) {
    switch (action.type) {
        case AuthActionsTypes.AUTH_LOGIN_REQUEST:
            return { ...state, loading: true };
        case AuthActionsTypes.AUTH_LOGIN_REQUEST_SUCCESS:
            return { ...state, loading: false };
        case AuthActionsTypes.AUTH_LOGIN_REQUEST_ERROR:
            return { ...state , loading: false };
    }

    return state;
}
