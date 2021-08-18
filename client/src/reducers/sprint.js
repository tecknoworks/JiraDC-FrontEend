import { SprintActionsTypes } from "../actions";
const getSprintInitialState = {
  loading: false,
  sprint: [
    {
      id: "1",
      name: "default",
      project_id: "2",

    },
  ],
};
const postSprintInitialState = {
  loading: false,
  component: {
    name: "",
    description: "",
    project_id:""
  },
};
const updateSprintInitialState = {
  loading: false,
  component: {
    name: "",
    description: "",
    project_id:"",
  },
};

export function getSprint(state = getSprintInitialState, action) {
  switch (action.type) {
    case SprintActionsTypes.SPRINT_GET_REQUEST:
      return { ...state, loading: true };
    case SprintActionsTypes.SPRINT_GET_REQUEST_SUCCESS:
      return { ...state, sprint: action.data, loading: false };
    case SprintActionsTypes.SPRINT_GET_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}

export function postSprint(state = postSprintInitialState, action) {
  switch (action.type) {
    case SprintActionsTypes.SPRINT_POST_REQUEST:
      return { ...state, loading: true };
    case SprintActionsTypes.SPRINT_POST_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case SprintActionsTypes.SPRINT_POST_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}


export function updateSprint(state = updateSprintInitialState, action) {
  switch (action.type) {
    case SprintActionsTypes.SPRINT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case SprintActionsTypes.SPRINT_UPDATE_REQUEST_SUCCESS:
      return { ...state, sprint: action.data, loading: false };
    case SprintActionsTypes.SPRINT_UPDATE_REQUEST_ERROR:
      return { ...state, loading: false };
    case SprintActionsTypes.SPRINT_USER_UPDATE_REQUEST_SUCCESS:
      debugger
      return { ...state, sprint: action.data };
  }

  return state;
}
