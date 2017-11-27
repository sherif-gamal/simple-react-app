import { SET_CHANNELS } from "../constants";

export default function userReducer(state = [], action) {
  switch (action.type) {
    case SET_CHANNELS:
      return action.payload;
    default:
      return state;
  }
}
