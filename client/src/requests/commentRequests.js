const BASE_API_URL = "http://localhost:8081";
const postComment = (data) => {
    return fetch(`${BASE_API_URL}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const putComment = (data) => {
    return fetch(`${BASE_API_URL}/comment`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


export default {
    postComment,
    putComment,
};