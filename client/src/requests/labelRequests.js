//const BASE_API_URL = process.env.BASE_API_URL;
const BASE_API_URL = "http://localhost:8081";
const getLabel = () => {
    return fetch(`${BASE_API_URL}/label`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
const postLabel = () => {
    return fetch(`${BASE_API_URL}/label`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
export default {
    getLabel,
    postLabel
};