import PageRequest from '../requests/pageRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const PageActionTypes = {
    REQUEST_PAGES: "REQUEST_PAGES",
    FETCH_PAGES: "FETCH_PAGES",
    FETCH_PAGES_SUCCESS: "FETCH_PAGES_SUCCESS",
    FETCH_PAGES_ERROR: "FETCH_PAGES_ERROR",

    ADD_PAGE_REQUEST: 'ADD_PAGE_REQUEST',
    ADD_PAGE_SUCCESS: 'ADD_PAGE_SUCCESS',
    ADD_PAGE_ERROR: 'ADD_PAGE_ERROR',

    REMOVE_PAGE_REQUEST: 'REMOVE_PAGE_REQUEST',
    REMOVE_PAGE_SUCCESS: 'REMOVE_PAGE_SUCCESS',
    REMOVE_PAGE_ERROR: 'REMOVE_PAGE_ERROR',

    REQUEST_PAGE: 'REQUEST_PAGE',
    REQUEST_PAGE_SUCCESS: 'REQUEST_PAGE_SUCCESS',
    REQUEST_PAGE_ERROR: 'REQUEST_PAGE_ERROR',
};

// Fetch Pages
export function requestPages(filters) {
    return {
        type: PageActionTypes.REQUEST_PAGES,
        filters
    };
}

export function fetchPagesSuccess(pages) {
    return {
        type: PageActionTypes.FETCH_PAGES_SUCCESS,
        pages
    };
}

export function fetchPagesError(error) {
    return {
        type: PageActionTypes.FETCH_PAGES_ERROR,
        error
    };
}

export function fetchPages(filters) {
    return dispatch => {
        dispatch(requestPages(filters));

        return PageRequest.fetchPages(filters)
            .then(response => responseToJson(response))
            .then(json => dispatch(fetchPagesSuccess(json)))
            .catch(error => {
                dispatch(fetchPagesError(error));
                return globalErrorHandler(error);
            });
    };
}

// Add Page
export function addPage(data) {
    return dispatch => {
        dispatch(addPageRequest());

        return PageRequest.addPage(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(addPageSuccess(json)))
            .catch(error => globalErrorHandler(error));
    };
}

export function addPageRequest() {
    return {
        type: PageActionTypes.ADD_PAGE_REQUEST,
    };
}

export function addPageSuccess() {
    return {
        type: PageActionTypes.ADD_PAGE_SUCCESS,
    };
}

export function addPageError(error) {
    return {
        type: PageActionTypes.ADD_PAGE_ERROR,
        error
    };
}

// Remove Page
export function removePage(id) {
    return dispatch => {
        dispatch(removePageRequest());

        return PageRequest.removePage(id)
            .then(response => responseToJson(response))
            .then(json => dispatch(removePageSuccess(json)))
            .then(() => dispatch(fetchPages({})))
            .catch(error => globalErrorHandler(error));
    };
}

export function removePageRequest() {
    return {
        type: PageActionTypes.REMOVE_PAGE_REQUEST,
    };
}

export function removePageSuccess() {
    return {
        type: PageActionTypes.REMOVE_PAGE_SUCCESS,
    };
}

export function removePageError(error) {
    return {
        type: PageActionTypes.REMOVE_PAGE_ERROR,
        error
    };
}


// Fetch Page
export function requestPage() {
    return {
        type: PageActionTypes.REQUEST_PAGE,
    };
}

export function fetchPageSuccess(page) {
    return {
        type: PageActionTypes.REQUEST_PAGE_SUCCESS,
        page
    };
}

export function fetchPage(id) {
    return dispatch => {
        dispatch(requestPage());

        return PageRequest.fetchPage(id)
            .then(response => responseToJson(response))
            .then(json => dispatch(fetchPageSuccess(json)))
            .catch(error => globalErrorHandler(error));
    };
}
