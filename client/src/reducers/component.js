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
  component: [],
};

const updateComponentInitialState = {
  loading: false,
  component: {
    name: "",
    description: "",
    user_id: "",
    project_id:""
  },
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

export function updateComponent(state = updateComponentInitialState, action) {
  switch (action.type) {
    case ComponentActionsTypes.COMPONENT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case ComponentActionsTypes.COMPONENT_UPDATE_REQUEST_SUCCESS:
      return { ...state, component: action.data, loading: false };
    case ComponentActionsTypes.COMPONENT_UPDATE_REQUEST_ERROR:
      return { ...state, loading: false };
    case ComponentActionsTypes.COMPONENT_USER_UPDATE_REQUEST_SUCCESS:
      return { ...state, component: action.data };
  }
  return state;
}

