const BASE_API_URL = "http://localhost:8081";
const postComponent = (data) => {
    return fetch(`${BASE_API_URL}/component`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const getComponent = () => {
    return fetch(`${BASE_API_URL}/component`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

const updateComponent = (data) => {
    return fetch(`${BASE_API_URL}/component`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


export default {
    getComponent,
    postComponent,
    updateComponent,
};