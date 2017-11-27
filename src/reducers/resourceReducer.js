import { SET_RESOURCES } from "../constants";

export default function userReducer(state = [], action) {
  switch (action.type) {
    case SET_RESOURCES:
      return action.payload;
    default:
      return state;
  }
}
