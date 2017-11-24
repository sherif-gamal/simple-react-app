import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer from "./userReducer";
import resourceReducer from "./resourceReducer";

export default combineReducers({
  user: userReducer,
  resources: resourceReducer,
  router: routerReducer
});
