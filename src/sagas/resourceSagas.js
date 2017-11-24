import { call, put, takeLatest } from "redux-saga/effects";
import { Resources } from "../api";
import {
  FETCH_RESOURCES,
  FETCH_RESOURCE,
  ADD_RESOURCE,
  SET_RESOURCES,
  SET_RESOURCE
} from "../constants";

function* fetchAll() {
  try {
    const { data } = yield call(Resources.fetchAll);
    yield put({ type: SET_RESOURCES, payload: data });
  } catch (error) {
    console.log("failed");
  }
}

function* fetch(action) {
  try {
    const { data } = yield call(Resources.fetch, action.payload);
    yield put({ type: SET_RESOURCE, payload: [data] });
  } catch (error) {
    console.log("too bad");
  }
}

function* addResource(action) {
  // try {
  //   const { data } = yield call(Resources.fetch, action.payload);
  //   yield put({ type: SET_RESOURCE, payload: data });
  // } catch (error) {
  //   console.log("too bad");
  // }
}

function* allResourcesWatcher() {
  yield takeLatest(FETCH_RESOURCES, fetchAll);
}
function* singleResourceWatcher() {
  yield takeLatest(FETCH_RESOURCE, fetch);
}
function* addResourceWatcher() {
  yield takeLatest(ADD_RESOURCE, addResource);
}

export default [
  allResourcesWatcher(),
  singleResourceWatcher(),
  addResourceWatcher()
];
