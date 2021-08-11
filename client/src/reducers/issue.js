import { IssueActionsTypes } from "../actions";

const getIssueInitialState = {
  loading: false,
  issue: [
    {
        id:"1",
        name:"epic"
    },
  ],
};


export function getIssue(state = getIssueInitialState, action) {
  switch (action.type) {
    case IssueActionsTypes.ISSUE_GET_REQUEST:
      return { ...state, loading: true };
    case IssueActionsTypes.ISSUE_GET_REQUEST_SUCCESS:
      return { ...state, issue: action.data, loading: false };
    case IssueActionsTypes.ISSUE_GET_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}
