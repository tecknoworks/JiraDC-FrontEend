const BASE_API_URL = process.env.BASE_API_URL;

const fetchPostsByPage = (pageId) => {
    return fetch(`${BASE_API_URL}/posts/page/${pageId}`);
}

const addPost = (data) => {
    return fetch(`${BASE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const removePost = (id) => {
    return fetch(`${BASE_API_URL}/posts/${id}`, {
        method: 'DELETE'
    });
}

export default {
    fetchPostsByPage,
    addPost,
    removePost
};