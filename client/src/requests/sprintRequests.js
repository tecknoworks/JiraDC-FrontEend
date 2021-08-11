//const BASE_API_URL = process.env.BASE_API_URL;
const BASE_API_URL = "http://localhost:8081";
const getSprint = () => {
    return fetch(`${BASE_API_URL}/sprint`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(data)
    });
}

export default {
    getSprint,
};