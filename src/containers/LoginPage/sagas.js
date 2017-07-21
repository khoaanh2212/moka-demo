
import { put, takeLatest, take, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import axios from 'axios';

import { ActionTypes, loginSuccess, loginFailed } from './actions';
import { apiRest as loginRest } from './apiRest';


export function* authCall(action) {
  try {
    const { username, password } = action;

    const result = yield axios.post(`${loginRest.root}`, {
      username,
      password,
    });
    yield put(loginSuccess(result.data));
    yield put(push('/employee'));
  } catch (err) {
    console.log(err);
    yield put(loginFailed());
  }
}

export function* watchLogin() {
  const watcher = yield takeLatest(ActionTypes.LOGIN_REQUEST, authCall);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchLogin,
];
