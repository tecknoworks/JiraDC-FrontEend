import { CommentActionsTypes } from "../actions";

const postCommentInitialState = {
  loading: false,
  comment: {
  },
};
const putCommentInitialState = {
  loading: false,
  comment: {
  },
};
export function postComment(state = postCommentInitialState, action) {
  switch (action.type) {
    case CommentActionsTypes.COMMENT_POST_REQUEST:
      return { ...state, loading: true };
    case CommentActionsTypes.COMMENT_POST_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case CommentActionsTypes.COMMENT_POST_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}

export function putComment(state = putCommentInitialState, action) {
  switch (action.type) {
    case CommentActionsTypes.COMMENT_PUT_REQUEST:
      return { ...state, loading: true };
    case CommentActionsTypes.COMMENT_PUT_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case CommentActionsTypes.COMMENT_PUT_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}


