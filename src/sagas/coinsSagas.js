import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_COINS, SET_COINS, API_ERROR } from "../constants";
import { Coins } from "../api";

function* fetchCoins() {
  try {
    const { data } = yield call(Coins.fetchAll);
    yield put({ type: SET_COINS, payload: data });
  } catch (error) {
    yield put({ type: API_ERROR, error });
  }
}

function* fetchCoinsWatcher() {
  yield takeLatest(FETCH_COINS, fetchCoins);
}

export default [fetchCoinsWatcher()];
