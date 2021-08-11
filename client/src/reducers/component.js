import { ComponentActionsTypes } from "../actions";
const getComponentInitialState = {
  loading: false,
  component: [
    {
      id: "1",
      name: "default",

    },
  ],
};

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
