const BASE_API_URL = "http://localhost:8081";
const getWorkItemProject = (data) => {
    return fetch(`${BASE_API_URL}/workItemProject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
const getWorkItem = () => {
    return fetch(`${BASE_API_URL}/workItem`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
const getWorkItemById = (data) => {
    return fetch(`${BASE_API_URL}/workItemById`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
const postWorkItem = (data) => {
    return fetch(`${BASE_API_URL}/workItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const getWorkItemEpic = () => {
    return fetch(`${BASE_API_URL}/workItem/epic`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

const updateWorkItem = (data) => {
    return fetch(`${BASE_API_URL}/workItem`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export default {
    getWorkItem,
    postWorkItem,
    getWorkItemEpic,
    getWorkItemProject,
    getWorkItemById,
    updateWorkItem,
};