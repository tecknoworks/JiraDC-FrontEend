import ProjectRequest from '../requests/projectRequest';
import { globalErrorHandler, responseToJson } from '../utils';

export const ProjectActionsTypes = {
    PROJECT_POST_REQUEST: 'PROJECT_POST_REQUEST',
    PROJECT_POST_REQUEST_SUCCESS: 'PROJECT_POST_REQUEST_SUCCESS',
    PROJECT_POST_REQUEST_ERROR: 'PROJECT_POST_REQUEST_ERROR',

    PROJECT_GET_REQUEST: 'PROJECT_GET_REQUEST',
    PROJECT_GET_REQUEST_SUCCESS: 'PROJECT_GET_REQUEST_SUCCESS',
    PROJECT_GET_REQUEST_ERROR: 'PROJECT_GET_REQUEST_ERROR',

    PROJECT_GET_KANBAN_REQUEST: 'PROJECT_GET_KANBAN_REQUEST',
    PROJECT_GET_KANBAN_REQUEST_SUCCESS: 'PROJECT_GET_KANBAN_REQUEST_SUCCESS',
    PROJECT_GET_KANBAN_REQUEST_ERROR: 'PROJECT_GET_KANBAN_REQUEST_ERROR',

    PROJECT_GET_SCRUM_REQUEST: 'PROJECT_GET_SCRUM_REQUEST',
    PROJECT_GET_SCRUM_REQUEST_SUCCESS: 'PROJECT_GET_SCRUM_REQUEST_SUCCESS',
    PROJECT_GET_SCRUM_REQUEST_ERROR: 'PROJECT_GET_SCRUM_REQUEST_ERROR',

    PROJECT_GET_BUGTRACKING_REQUEST: 'PROJECT_GET_BUGTRACKING_REQUEST',
    PROJECT_GET_BUGTRACKING_REQUEST_SUCCESS: 'PROJECT_GET_BUGTRACKING_REQUEST_SUCCESS',
    PROJECT_GET_BUGTRACKING_REQUEST_ERROR: 'PROJECT_GET_BUGTRACKING_REQUEST_ERROR',

};

export function postBegin() {
    return {
        type: ProjectActionsTypes.PROJECT_POST_REQUEST
    };
}

export function postSuccess(data) {
    return {
        type: ProjectActionsTypes.PROJECT_POST_REQUEST_SUCCESS,
        data
    };
}

export function postError() {
    return {
        type: ProjectActionsTypes.PROJECT_POST_REQUEST_ERROR,
    };
}

export function postProject(data) {
    return dispatch => {
        dispatch(postBegin());

        return ProjectRequest.postProject(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(postSuccess(json)))
            .catch(error => {
                dispatch(postError());
                return globalErrorHandler(error);
            });
    };
}


//getprojects
export function getBegin() {
    return {
        type: ProjectActionsTypes.PROJECT_GET_REQUEST
    };
}

export function getSuccess(data) {
    return {
        type: ProjectActionsTypes.PROJECT_GET_REQUEST_SUCCESS,
        data
    };
}

export function getError() {
    return {
        type: ProjectActionsTypes.PROJECT_GET_REQUEST_ERROR,
    };
}

// Request gets
export function getProject() {
    return dispatch => {
        dispatch(getBegin());

        return ProjectRequest.getProject()
            .then(response => responseToJson(response))
            .then(json => dispatch(getSuccess(json)))
            .catch(error => {
                dispatch(getError());
                return globalErrorHandler(error);
            });
    };
}

//kanban
//getprojects
export function getKanbanBegin() {
    return {
        type: ProjectActionsTypes.PROJECT_GET_KANBAN_REQUEST
    };
}

export function getKanbanSuccess(data) {
    return {
        type: ProjectActionsTypes.PROJECT_GET_KANBAN_REQUEST_SUCCESS,
        data
    };
}

export function getKanbanError() {
    return {
        type: ProjectActionsTypes.PROJECT_GET_KANBAN_REQUEST_ERROR,
    };
}

// Request gets
export function getKanbanProject() {
    return dispatch => {
        dispatch(getKanbanBegin());

        return ProjectRequest.getKanbanProject()
            .then(response => responseToJson(response))
            .then(json => dispatch(getKanbanSuccess(json)))
            .catch(error => {
                dispatch(getKanbanError());
                return globalErrorHandler(error);
            });
        }
};


//SCRUM
export function getScrumBegin() {
    return {
        type: ProjectActionsTypes.PROJECT_GET_SCRUM_REQUEST
    };
}

export function getScrumSuccess(data) {
    return {
        type: ProjectActionsTypes.PROJECT_GET_SCRUM_REQUEST_SUCCESS,
        data
    };
}

export function getScrumError() {
    return {
        type: ProjectActionsTypes.PROJECT_GET_SCRUM_REQUEST_ERROR,
    };
}

// Request gets
export function getScrumProject() {
    return dispatch => {
        dispatch(getScrumBegin());

        return ProjectRequest.getScrumProject()
            .then(response => responseToJson(response))
            .then(json => dispatch(getScrumSuccess(json)))
            .catch(error => {
                dispatch(getScrumError());
                return globalErrorHandler(error);
            });
        }
};

//BUGTRACKING
//getprojects
export function getBugtrackingBegin() {
    return {
        type: ProjectActionsTypes.PROJECT_GET_BUGTRACKING_REQUEST
    };
}

export function getBugtrackingSuccess(data) {
    return {
        type: ProjectActionsTypes.PROJECT_GET_BUGTRACKING_REQUEST_SUCCESS,
        data
    };
}

export function getBugtrackingError() {
    return {
        type: ProjectActionsTypes.PROJECT_GET_BUGTRACKING_REQUEST_ERROR,
    };
}

// Request gets
export function getBugtrackingProject() {
    return dispatch => {
        dispatch(getBugtrackingBegin());

        return ProjectRequest.getBugtrackingProject()
            .then(response => responseToJson(response))
            .then(json => dispatch(getBugtrackingSuccess(json)))
            .catch(error => {
                dispatch(getBugtrackingError());
                return globalErrorHandler(error);
            });
        }
};

