const BASE_API_URL = "http://localhost:8081";
const getWorkItem = () => {
    return fetch(`${BASE_API_URL}/workItem`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
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
export default {
    getWorkItem,
    postWorkItem,
    getWorkItemEpic
};