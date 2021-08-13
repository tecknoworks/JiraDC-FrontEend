import { ComponentActionsTypes } from "../actions";
const postComponentInitialState = {
  loading: false,
  component: {
    name: "default",
    description: "default",
    user_id: "1",
    project_id:"2"
  },
};

const getComponentInitialState = {
  loading: false,
  component: [
    {
      id: "1",
      name: "default",
    },
  ],
};

export function postComponent(state = postComponentInitialState, action) {
  switch (action.type) {
    case ComponentActionsTypes.COMPONENT_POST_REQUEST:
      return { ...state, loading: true };
    case ComponentActionsTypes.COMPONENT_POST_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case ComponentActionsTypes.COMPONENT_POST_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}

export function getComponent(state = getComponentInitialState, action) {
  switch (action.type) {
    case ComponentActionsTypes.COMPONENT_GET_REQUEST:
      return { ...state, loading: true };
    case ComponentActionsTypes.COMPONENT_GET_REQUEST_SUCCESS:
      return { ...state, component: action.data, loading: false };
    case ComponentActionsTypes.COMPONENT_GET_REQUEST_ERROR:
      return { ...state, loading: false };
  }

  return state;
}
