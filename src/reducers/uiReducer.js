import {
  ID_SENDING,
  ADDRESS_SENDING,
  CARD_SENDING,
  ID_SENT,
  ADDRESS_SENT,
  CARD_ADDED,
  ERROR_SETTING_PHONE,
  ERROR_VERIFYING_PHONE,
  SMS_SENT,
  PHONE_VERIFIED,
  SHOW_MODAL,
  HIDE_MODAL
} from "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case ID_SENDING:
      return { ...state, idSending: true };
    case ID_SENT:
      return { ...state, idSending: false };
    case ADDRESS_SENDING:
      return { ...state, addressSending: true };
    case ADDRESS_SENT:
      return { ...state, addressSending: false };
    case CARD_SENDING:
      return { ...state, cardSending: true };
    case CARD_ADDED:
      return { ...state, cardSending: false };
    case ERROR_SETTING_PHONE:
      return { ...state, errorSettingPhone: true };
    case SMS_SENT:
      return { ...state, errorSettingPhone: false };
    case ERROR_VERIFYING_PHONE:
      return { ...state, errorVerifyingPhone: true };
    case PHONE_VERIFIED:
      return { ...state, errorVerifyingPhone: false };
    case SHOW_MODAL:
      return { ...state, modal: action.payload };
    case HIDE_MODAL:
      return { ...state, modal: null };
    default:
      return state;
  }
};
