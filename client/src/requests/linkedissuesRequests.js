//const BASE_API_URL = process.env.BASE_API_URL;
const BASE_API_URL = "http://localhost:8081";
const getLinkedIssues = () => {
    return fetch(`${BASE_API_URL}/linkedissues`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(data)
    });
}

export default {
    getLinkedIssues,
};