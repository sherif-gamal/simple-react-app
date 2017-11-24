import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_ERROR
} from "../constants";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const initialState = {
  account: undefined,
  loginError: undefined,
  signupError: undefined,
  userId,
  token
};

export default function userReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOGIN_SUCCESS:
      newState = {
        ...state,
        token: action.payload.id,
        userId: action.payload.userId
      };
      delete newState.loginError;
      return newState;
    case LOGOUT_SUCCESS:
      return {};
    case SIGNUP_ERROR:
      return { ...state, signupError: action.error };
    case LOGIN_ERROR:
      return { ...state, loginError: action.error };
    default:
      return state;
  }
}
