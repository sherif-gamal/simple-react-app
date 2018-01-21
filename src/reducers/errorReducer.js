import { SET_ERROR, CLEAR_ERROR } from "../constants";

export default (state = {}, action) => {
  const e = action.payload;
  switch (action.type) {
    case SET_ERROR:
      return { ...state, [e.key]: e.value };
    case CLEAR_ERROR: {
      const { [e.key]: omit, newState } = state;
      return newState;
    }
    default:
      return state;
  }
};
