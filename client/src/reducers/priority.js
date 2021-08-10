import { PriorityActionsTypes } from "../actions";
const getPriorityInitialState = {
  loading: false,
  priority: [
    {
      id: "1",
      name: "default",

    },
  ],
};

export function getPriority(state = getPriorityInitialState, action) {
  switch (action.type) {
    case PriorityActionsTypes.PRIORITY_GET_REQUEST:
      return { ...state, loading: true };
    case PriorityActionsTypes.PRIORITY_GET_REQUEST_SUCCESS:
      return { ...state, priority: action.data, loading: false };
    case PriorityActionsTypes.PRIORITY_GET_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}
