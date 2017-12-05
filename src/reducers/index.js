import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import coinReducer from "./coinsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  user: userReducer,
  coins: coinReducer,
  router: routerReducer
});
