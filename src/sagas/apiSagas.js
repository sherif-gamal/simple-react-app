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
import { push } from "react-router-redux";
import Api, { Users, Coins } from "../api";
import {
  REQUEST_LOGIN,
  FETCH_COINS,
  LOGIN_ERROR,
  LOG_OUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  SIGNUP,
  SET_TOKEN,
  SIGNUP_ERROR,
  SET_COINS,
  SET_ERROR,
  SET_USER,
  FETCH_USER,
  INIT,
  UPLOAD_ID,
  UPLOAD_ADDRESS,
  ADD_CARD,
  ID_SENT,
  ADDRESS_SENT,
  CARD_ADDED,
  ID_SENDING,
  ADDRESS_SENDING,
  CARD_SENDING,
  SET_PHONE_NUMBER,
  SMS_SENT,
  PHONE_VERIFIED,
  SEND_SMS_CODE,
  GET_CLIENT_TOKEN,
  SET_CLIENT_TOKEN,
  ERROR_VERIFYING_PHONE,
  CLEAR_ERROR,
  VERIFY_EMAIL
} from "../constants";

function* login(credentials) {
  try {
    const { data } = yield call(Users.login, credentials);
    yield put({ type: SET_USER, payload: data.user });
    yield put({ type: SET_TOKEN, payload: data.token });
    yield put(push("/"));
  } catch (error) {
    yield put({
      type: SET_ERROR,
      payload: { key: "login", value: error.response.data.message }
    });
  } finally {
    if (yield cancelled()) {
      yield put(push("/login"));
    }
  }
}

function* logout(action) {
  try {
    yield call(Users.logout, action.payload);
    yield localStorage.clear();
    yield put({ type: LOGOUT_SUCCESS });
    yield put({ type: SET_TOKEN, payload: null });
  } catch (e) {
    yield put({ type: LOGOUT_ERROR, e });
  }
}

function* signup(action) {
  try {
    yield call(Users.signup, action.payload);
    yield put(push("/created"));
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error: error.response.statusText });
  }
}
function* fetchUser() {
  try {
    const response = yield call(Users.me);
    yield put({ type: SET_USER, payload: response.data });
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error: error.response.statusText });
  }
}

function* setToken(action) {
  if (!action.payload) {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
    yield put({ type: SET_USER, payload: null });
  } else {
    axios.defaults.headers.common.Authorization = action.payload;
    localStorage.setItem("token", action.payload);
    yield put({ type: FETCH_USER });
  }
}

function* init(action) {
  yield setToken(action);
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
function* fetchCoins() {
  try {
    const { data } = yield call(Coins.fetchAll);
    yield put({ type: SET_COINS, payload: data });
  } catch (error) {
    yield put({ type: SET_ERROR, error });
  }
}
function* uploadId(action) {
  const url = "/api/users/uploadId";
  const data = new FormData();
  const payload = action.payload;
  for (let i = 0; i < payload.length; i += 1) {
    data.append("files", payload[i]);
  }
  yield put({ type: ID_SENDING });
  yield call(Api.post, url, data);
  yield put({ type: ID_SENT });
}

function* uploadAddress(action) {
  const data = new FormData();
  data.append("file", action.payload);
  yield put({ type: ADDRESS_SENDING });
  yield call(Api.post, "/api/users/uploadAddress", data);
  yield put({ type: ADDRESS_SENT });
}
function* addCard(action) {
  const data = new FormData();
  data.append("file", action.payload);
  yield put({ type: CARD_SENDING });

  yield call(Users.upload, "/api/users/uploadAddress", data);
  yield put({ type: CARD_ADDED });
}

function* setPhoneNumber(action) {
  try {
    const result = yield call(Users.phone, { phone: action.payload });
    yield put({ type: SMS_SENT });
  } catch (e) {
    yield put({ type: SET_ERROR, e });
  }
}

function* verifyPhoneNumber(action) {
  try {
    const result = yield call(Users.verifyPhone, { code: action.payload });
    yield put({ type: PHONE_VERIFIED });
  } catch (e) {
    yield put({ type: ERROR_VERIFYING_PHONE });
  }
}
function* getClientToken(action) {
  try {
    const { clientToken } = yield call(Api.get, "/api/checkouts/start");
    yield put({ type: SET_CLIENT_TOKEN, payload: clientToken });
  } catch (e) {
    yield put({ type: SET_ERROR, e });
  }
}

function* verifyEmail(action) {
  try {
    yield call(Api.get, "/api/users/verifyEmail");
    yield put(push("/login"), { verified: true });
  } catch (e) {
    yield put({
      type: SET_ERROR,
      payload: { key: "verifyEmail", value: e.response.data.message }
    });
  }
}

// function* fetchCoinsWatcher() {
//   yield takeLatest(FETCH_COINS, fetchCoins);
// }
//

function* watchers() {
  yield takeLatest(SIGNUP, signup);
  yield takeLatest(FETCH_USER, fetchUser);
  yield takeLatest(SET_TOKEN, setToken);
  yield takeLatest(INIT, init);

  yield takeLatest(FETCH_COINS, fetchCoins);
  yield takeLatest(UPLOAD_ID, uploadId);
  yield takeLatest(UPLOAD_ADDRESS, uploadAddress);
  yield takeLatest(ADD_CARD, addCard);
  yield takeLatest(SET_PHONE_NUMBER, setPhoneNumber);
  yield takeLatest(SEND_SMS_CODE, verifyPhoneNumber);
  yield takeLatest(VERIFY_EMAIL, verifyEmail);

  yield takeLatest(GET_CLIENT_TOKEN, getClientToken);
}

export default [loginWatcher(), watchers(), logoutWatcher()];
