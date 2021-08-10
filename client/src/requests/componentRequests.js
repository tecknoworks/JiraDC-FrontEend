//const BASE_API_URL = process.env.BASE_API_URL;
const BASE_API_URL = "http://localhost:8081";
const getComponent = () => {
    return fetch(`${BASE_API_URL}/component`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(data)
    });
}

export default {
    getComponent,
};