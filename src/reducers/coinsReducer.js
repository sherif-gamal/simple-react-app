import { SET_COINS } from "../constants";

export default function userReducer(state = [], action) {
  switch (action.type) {
    case SET_COINS:
      return action.payload;
    default:
      return state;
  }
}
