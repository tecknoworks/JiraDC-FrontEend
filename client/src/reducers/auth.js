import { AuthActionsTypes } from '../actions';
import { getLoggedUser } from '../utils/persistance';

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
        password: 'catalina',
        
    },
    isAuthUser: getLoggedUser().isAuthUser
}
const getUsersInitialState = {
    loading: false,
    user: [{
        id:'1',
        username: 'catalina',
        
    }]
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
            localStorage.setItem("userData", JSON.stringify(action.data));
            //console.log(action.data)
            return { ...state, isAuthUser: true, user: action.data.token, loading: false };
        case AuthActionsTypes.AUTH_LOGIN_REQUEST_ERROR:
            return { ...state , loading: false }; 
    }

    return state;
}

//logout
export function logout(state = loginInitialState, action) {
    switch (action.type) {
        case AuthActionsTypes.AUTH_LOGOUT_REQUEST:
            console.log("request")
            localStorage.removeItem("userData",JSON.stringify(action.data));
            return { ...state, isAuthUser:false, loading: true };
        case AuthActionsTypes.AUTH_LOGOUT_REQUEST_SUCCESS:
            console.log("hey")
            localStorage.removeItem("userData",JSON.stringify(action.data));
            return { ...state, isAuthUser: false, loading: false };
        case AuthActionsTypes.AUTH_LOGOUT_REQUEST_ERROR:
            console.log("err")
            return { ...state , loading: false }; 
    }

    return state;
}

//GetAllUsers
export function getAllUsers(state = getUsersInitialState, action) {
    switch (action.type) {
        case AuthActionsTypes.AUTH_GETUSERS_REQUEST:
            return { ...state,loading: true };
        case AuthActionsTypes.AUTH_GETUSERS_REQUEST_SUCCESS:
            return { ...state,user:action.data, loading: false };
        case AuthActionsTypes.AUTH_GETUSERS_REQUEST_ERROR:
            return { ...state , loading: false }; 
    }
    return state;
}
