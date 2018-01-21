import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import coins from "./coinsReducer";
import { token, user } from "./userReducer";
import { redirectUrl } from "./appReducer";
import ui from "./uiReducer";
import checkout from "./checkout";

import errors from "./errorReducer";

export default combineReducers({
  router: routerReducer,
  user,
  token,
  coins,
  errors,
  ui,
  checkout,
  redirectUrl
});
