import { SET_REDIRECT_URL, APP_READY, EMAIL_VERIFICATION } from "../constants";

export default function appState(state = {}, action) {
  switch (action.type) {
    case SET_REDIRECT_URL:
      return { ...state, redirectUrl: action.payload };
    case APP_READY:
      return { ...state, appReady: true };
    case EMAIL_VERIFICATION:
      return { ...state, emailVerification: action.payload };
    default:
      return state;
  }
}

export const x = 1;
