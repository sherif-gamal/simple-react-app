import { call, put, takeLatest } from "redux-saga/effects";
import { Channels } from "../api";
import { FETCH_CHANNELS, SET_CHANNELS, SET_CHANNEL } from "../constants";

function* fetchAll() {
  try {
    const { data } = yield call(Channels.fetchAll);
    yield put({ type: SET_CHANNELS, payload: data });
  } catch (error) {
    console.log("failed");
  }
}

function* fetch(action) {
  try {
    const { data } = yield call(Channels.fetch, action.payload);
    yield put({ type: SET_CHANNEL, payload: [data] });
  } catch (error) {
    console.log("too bad");
  }
}

function* allChannelsWatcher() {
  yield takeLatest(FETCH_CHANNELS, fetchAll);
}
function* singleChannelWatcher() {
  yield takeLatest(FETCH_CHANNEL, fetch);
}

export default [allChannelsWatcher(), singleChannelWatcher()];
