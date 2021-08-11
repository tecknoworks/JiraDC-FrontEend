const BASE_API_URL = "http://localhost:8081";
const postProject = (data) => {
    return fetch(`${BASE_API_URL}/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
const getProject = () => {
    return fetch(`${BASE_API_URL}/project`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
const getKanbanProject = () => {
    return fetch(`${BASE_API_URL}/project/kanban`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
const getScrumProject = () => {
    return fetch(`${BASE_API_URL}/project/scrum`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
const getBugtrackingProject = () => {
    return fetch(`${BASE_API_URL}/project/bugtracking`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
export default {
    postProject,
    getProject,
    getKanbanProject,
    getScrumProject,
    getBugtrackingProject
};