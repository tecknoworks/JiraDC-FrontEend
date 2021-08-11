//const BASE_API_URL = process.env.BASE_API_URL;
const BASE_API_URL = "http://localhost:8081";
const getIssue = () => {
    return fetch(`${BASE_API_URL}/issue`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
export default {
    getIssue,
};