const BASE_API_URL = process.env.BASE_API_URL;

const fetchTiersByPage = (pageId) => {
    return fetch(`${BASE_API_URL}/tiers/page/${pageId}`);
}

const addTier = (data) => {
    return fetch(`${BASE_API_URL}/tiers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const activateTier = (id) => {
    return fetch(`${BASE_API_URL}/tiers/activate`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    });
}

const removeTier = (id) => {
    return fetch(`${BASE_API_URL}/tiers/${id}`, {
        method: 'DELETE'
    });
}

export default {
    fetchTiersByPage,
    addTier,
    activateTier,
    removeTier
};