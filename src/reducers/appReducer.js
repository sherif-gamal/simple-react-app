import { SET_REDIRECT_URL } from "../constants";

export function redirectUrl(state = null, action) {
  switch (action.type) {
    case SET_REDIRECT_URL:
      return action.payload;
    default:
      return state;
  }
}

export const x = 1;
