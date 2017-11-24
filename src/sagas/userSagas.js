import {
  take,
  fork,
  cancel,
  call,
  put,
  cancelled,
  takeLatest
} from "redux-saga/effects";
import axios from "axios";
import { Users } from "../api";
import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  FETCH_USER,
  FETCH_RESOURCES,
  UPDATE_AUTH_HEADER
} from "../constants";
import history from "../utils/history";

function* login(credentials) {
  try {
    const { data } = yield call(Users.login, credentials);
    yield put({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("token", data.id);
    localStorage.setItem("userId", data.userId);
    axios.defaults.headers.common.Authorization = data.id;
    history.push("/");
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  } finally {
    if (yield cancelled()) {
      history.push("/login");
    }
  }
}

function* logout(action) {
  try {
    yield call(Users.logout, action.payload);
    yield localStorage.clear();
    yield put({ type: LOGOUT_SUCCESS });
    yield put({ type: UPDATE_AUTH_HEADER, payload: null });
    yield put({ type: FETCH_RESOURCES});
  } catch (e) {
    yield put({ type: LOGOUT_ERROR, e });
  }
}

function* signup(action) {
  try {
    const response = yield call(Users.signup, action.payload);
    yield put({ type: SIGNUP_SUCCESS, response });
    history.push("/login");
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error: error.response.statusText });
  }
}

function* signupWatcher() {
  yield takeLatest(SIGNUP, signup);
}

function* logoutWatcher() {
  yield takeLatest(LOG_OUT, logout);
}

function* loginWatcher() {
  while (true) {
    const { payload } = yield take(REQUEST_LOGIN);

    const task = yield fork(login, payload);

    const action = yield take([LOG_OUT, LOGIN_ERROR]);

    if (action.type === LOG_OUT) yield cancel(task);
    // yield call(logout);
  }
}

function fetchUser() {
  // const token = localStorage.getItem("token");
  // const userId = localStorage.getItem("userId");
  // history.push("/");
}

function* fetchUserWatcher() {
  yield takeLatest(FETCH_USER, fetchUser);
}

export default [
  loginWatcher(),
  signupWatcher(),
  logoutWatcher(),
  fetchUserWatcher()
];
