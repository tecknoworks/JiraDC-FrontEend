import { WorkItemActionsTypes } from "../actions";

const postWorkItemInitialState = {
    loading: false,
    workItem: [
    ],
  };
  
const getWorkItemInitialState = {
  loading: false,
  workItem: [
  ],
  workItemEpic:[

  ],
};

export function postWorkItem(state = postWorkItemInitialState, action) {
    switch (action.type) {
      case WorkItemActionsTypes.WORKITEM_POST_REQUEST:
        return { ...state, loading: true };
      case WorkItemActionsTypes.WORKITEM_POST_REQUEST_SUCCESS:
        return { ...state, workItem: action.data, loading: false };
      case WorkItemActionsTypes.WORKITEM_POST_REQUEST_ERROR:
        return { ...state, loading: false };
    }
  
    return state;
  }
  
export function getWorkItem(state = getWorkItemInitialState, action) {
  switch (action.type) {
    case WorkItemActionsTypes.WORKITEM_GET_REQUEST:
      return { ...state, loading: true };
    case WorkItemActionsTypes.WORKITEM_GET_REQUEST_SUCCESS:
      return { ...state, workItem: action.data, loading: false };
    case WorkItemActionsTypes.WORKITEM_GET_REQUEST_ERROR:
      return { ...state, loading: false };
    case WorkItemActionsTypes.WORKITEM_GET_EPIC_REQUEST_SUCCESS:
        return { ...state,workItemEpic:action.data, loading: false };
  }

  return state;
}
