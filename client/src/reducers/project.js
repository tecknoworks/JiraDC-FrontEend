import { ProjectActionsTypes } from "../actions";

const postProjectInitialState = {
  loading: false,
  project: {
    name: "default",
    type: "kanban",
    user_id: "1",
  },
};
const getProjectInitialState = {
  loading: false,
  project: [
    {
      name: "default",
      type: "kanban",
      user_id: "1",
    },
  ],
};

export function postProject(state = postProjectInitialState, action) {
  switch (action.type) {
    case ProjectActionsTypes.PROJECT_POST_REQUEST:
      return { ...state, loading: true };
    case ProjectActionsTypes.PROJECT_POST_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case ProjectActionsTypes.PROJECT_POST_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}

export function getProject(state = getProjectInitialState, action) {
  switch (action.type) {
    case ProjectActionsTypes.PROJECT_GET_REQUEST:
      return { ...state, loading: true };
    case ProjectActionsTypes.PROJECT_GET_REQUEST_SUCCESS:
      return { ...state, project: action.data, loading: false };
    case ProjectActionsTypes.PROJECT_GET_REQUEST_ERROR:
      return { ...state, loading: false };
    case ProjectActionsTypes.PROJECT_GET_KANBAN_REQUEST_SUCCESS:
      return { ...state, project: action.data, loading: false };
      case ProjectActionsTypes.PROJECT_GET_SCRUM_REQUEST_SUCCESS:
      return { ...state, project: action.data, loading: false };
      case ProjectActionsTypes.PROJECT_GET_BUGTRACKING_REQUEST_SUCCESS:
      return { ...state, project: action.data, loading: false };
  }

  return state;
}
