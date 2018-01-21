import { SET_CLIENT_TOKEN } from "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CLIENT_TOKEN:
      return { ...state, clientToken: action.payload };
    default:
      return state;
  }
};
