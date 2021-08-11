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
