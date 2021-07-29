import { PageActionTypes } from '../actions';

const pagesInitialState = {
    loadingPages: false,

    filters: null,
    data: [],
}

export function pages(state = pagesInitialState, action) {
    switch (action.type) {
        case PageActionTypes.REQUEST_PAGES:
            return { ...state, filters: action.filters, loadingPages: true };
        case PageActionTypes.FETCH_PAGES_SUCCESS:
            return { ...state, data: action.pages, loadingPages: false };
        case PageActionTypes.FETCH_PAGES_ERROR:
            return { ...state, data: [], loadingPages: false };
    }

    return state;
}

const pageInitialState = {
    data: null,
    loadingPage: false,
}

export function page(state = pageInitialState, action) {
    switch (action.type) {
        case PageActionTypes.REQUEST_PAGE:
            return { ...state, filters: action.filters, loadingPage: true };
        case PageActionTypes.REQUEST_PAGE_SUCCESS:
            return { ...state, data: action.page, loadingPage: false };
        case PageActionTypes.REQUEST_PAGE_ERROR:
            return { ...state, data: {}, loadingPage: false };
    }

    return state;
}

