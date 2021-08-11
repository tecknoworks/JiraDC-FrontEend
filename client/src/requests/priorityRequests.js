const BASE_API_URL = "http://localhost:8081";
const getPriority = () => {
    return fetch(`${BASE_API_URL}/priority`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export default {
    getPriority,
};