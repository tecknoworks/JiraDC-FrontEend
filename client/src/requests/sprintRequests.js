const BASE_API_URL = "http://localhost:8081";
const getSprint = (payload) => {
    let url = `${BASE_API_URL}/sprint`;
    if (payload) {
        url = url + "?id=" + payload.id;
    }

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
const postSprint = (data) => {
    return fetch(`${BASE_API_URL}/sprint`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
const updateSprint = (data) => {
    return fetch(`${BASE_API_URL}/sprint`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
export default {
    getSprint,
    postSprint,
    updateSprint,
};