import { call, put, takeLatest } from 'redux-saga/effects'
import { Users } from '../api';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(action) {
   try {
      const user = yield call(Users.login, action.payload);
      yield put({type: "USER_LOGGED_IN", user: user});
   } catch (e) {
      yield put({type: "USER_LOGIN_FAILED", message: e.message});
   }
}

function* userSaga() {
  yield takeLatest("USER_LOGIN", login);
}

export default userSaga;
