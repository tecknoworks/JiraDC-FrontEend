import { LabelActionsTypes } from "../actions";

const postLabelInitialState = {
    loading: false,
    label: [
      {
          id:"1",
          name:"start"
      },
    ],
  };
  
const getLabelInitialState = {
  loading: false,
  label: [
  ],
};

export function postLabel(state = postLabelInitialState, action) {
    switch (action.type) {
      case LabelActionsTypes.LABEL_POST_REQUEST:
        return { ...state, loading: true };
      case LabelActionsTypes.LABEL_POST_REQUEST_SUCCESS:
        return { ...state, label: action.data, loading: false };
      case LabelActionsTypes.LABEL_POST_REQUEST_ERROR:
        return { ...state, loading: false };
    }
  
    return state;
  }
  
export function getLabel(state = getLabelInitialState, action) {
  switch (action.type) {
    case LabelActionsTypes.LABEL_GET_REQUEST:
      return { ...state, loading: true };
    case LabelActionsTypes.LABEL_GET_REQUEST_SUCCESS:
      return { ...state, label: action.data, loading: false };
    case LabelActionsTypes.LABEL_GET_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}
