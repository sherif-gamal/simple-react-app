import {
  SET_USER,
  SET_TOKEN,
  ID_SENT,
  ADDRESS_SENT,
  SMS_SENT,
  PHONE_VERIFIED
} from "../constants";

export function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case SMS_SENT:
      return { ...state, phoneVerification: "P" };
    case PHONE_VERIFIED:
      return { ...state, phoneVerification: "V" };
    case ID_SENT:
      return { ...state, idVerification: "P" };
    case ADDRESS_SENT:
      return { ...state, addressVerification: "P" };
    default:
      return state;
  }
}

const accessToken = localStorage.getItem("token");
export function token(state = accessToken, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
}
