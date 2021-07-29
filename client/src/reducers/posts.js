import { PostActions } from '../actions';

const initialState = {
    loadingPosts: false,
    data: [],

    addProgress: false,
}

export function posts(state = initialState, action) {
    switch (action.type) {
        case PostActions.REQUEST_POSTS_BY_PAGE:
            return { ...state, loadingPosts: true };
        case PostActions.REQUEST_POSTS_BY_PAGE_SUCCESS:
            return { ...state, data: action.posts, loadingPosts: false };
        case PostActions.REQUEST_POSTS_BY_PAGE_ERROR:
            return { ...state, data: [], loadingPosts: false };

        case PostActions.ADD_POST:
            return { ...state, addProgress: true };
        case PostActions.ADD_POST_SUCCESS:
            return { ...state, data: [...state.data, action.post], addProgress: false };
        case PostActions.ADD_POST_ERROR:
            return { ...state, addProgress: false };
    }

    return state;
}