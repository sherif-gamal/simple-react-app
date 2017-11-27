import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer from "./userReducer";
import resourceReducer from "./resourceReducer";
import channelReducer from "./channelReducer";

export default combineReducers({
  user: userReducer,
  resources: resourceReducer,
  channels: channelReducer,
  router: routerReducer
});
