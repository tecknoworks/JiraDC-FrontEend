//const BASE_API_URL = process.env.BASE_API_URL;
const BASE_API_URL = "http://localhost:8081";
const register = (data) => {
    return fetch(`${BASE_API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
const login = (data) => {
    console.log(data)
    return fetch(`${BASE_API_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const logout = (data) => {
    console.log(data)
    return fetch(`${BASE_API_URL}/signout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
const getAllUsers = () => {
    return fetch(`${BASE_API_URL}/allusers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
export default {
    register,
    login,
    logout,
    getAllUsers
};