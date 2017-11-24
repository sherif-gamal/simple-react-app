import { SET_RESOURCE, SET_RESOURCES } from "../constants";

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
  switch (action.type) {
    case SET_RESOURCES:
      return action.payload;
    default:
      return state;
  }
}
