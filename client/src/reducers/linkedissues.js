import { LinkedIssuesActionsTypes } from "../actions";
const getLinkedissuesInitialState = {
  loading: false,
  linkedissues: [
  ],
};

export function getLinkedIssues(state = getLinkedissuesInitialState, action) {
  switch (action.type) {
    case LinkedIssuesActionsTypes .LINKEDISSUES_GET_REQUEST:
      return { ...state, loading: true };
    case LinkedIssuesActionsTypes .LINKEDISSUES_GET_REQUEST_SUCCESS:
      return { ...state, linkedissues: action.data, loading: false };
    case LinkedIssuesActionsTypes .LINKEDISSUES_GET_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}
