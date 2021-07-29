const BASE_API_URL = process.env.BASE_API_URL;

const fetchPages = (filters) => {
    return fetch(`${BASE_API_URL}/pages`);
}

const fetchPage = (id) => {
    return fetch(`${BASE_API_URL}/pages/${id}`);
}

const addPage = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    return fetch(`${BASE_API_URL}/pages`, {
        method: 'POST',
        body: formData
    });
}

const removePage = (id) => {
    return fetch(`${BASE_API_URL}/pages/${id}`, {
        method: 'DELETE'
    });
}

export default {
    fetchPages,
    fetchPage,
    addPage,
    removePage
};