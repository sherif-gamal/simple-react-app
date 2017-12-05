import { all, takeLatest } from "redux-saga/effects";
import axios from "axios";
import userSagas from "./userSagas";
import coinSagas from "./coinsSagas";
import { UPDATE_AUTH_HEADER } from "../constants";

function* watchUpdateAuthHeader() {
  yield takeLatest(UPDATE_AUTH_HEADER, action => {
    if (!action.payload) delete axios.defaults.headers.common.Authorization;
    else axios.defaults.headers.common.Authorization = action.payload;
  });
}

export default function* rootSaga() {
  yield all([...userSagas, ...coinSagas, watchUpdateAuthHeader()]);
}
