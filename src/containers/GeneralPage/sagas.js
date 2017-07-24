import { eventChannel, buffers } from 'redux-saga';
import { take, takeLatest, put, call, fork, cancel, actionChannel } from 'redux-saga/effects';
import axios from 'axios';
import io from 'socket.io-client';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { socketTypes } from './sockets';
import { employeeLoaded, employeeRefresh, userLoaded, userRefresh, ActionTypes } from './actions';
import { apiRest as generalRest } from './apiRest';

function connect() {
  try {
    const socket = io('http://localhost:8000');

    return new Promise((resolve) => {
      socket.on('connect', () => {
        resolve(socket);
      });
    });
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

function disconnect(socket) {
  socket.disconnect();
}

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on('greetings', (message) => {
      console.log(message);
    });

    socket.on(socketTypes.CHANGE_EMPLOYEE, (data) => {
      emit(employeeRefresh(data));
    });

    socket.on(socketTypes.CHANGE_USER, (data) => {
      emit(userRefresh(data));
    });

    return () => {
    };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  // use call, not fork here because result is promise and need passed result to handle after that

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
}

function* getEmployee() {
  try {
    const employees = yield call(request, generalRest.employee);
    yield put(employeeLoaded(employees));
  } catch (err) {
    console.log(err);
  }
}

function* deleteEmployee(socket, action) {
  const { token, id } = action;
  try {
    const employees = yield axios.delete(`${generalRest.employee}`, {
      params: {
        token,
        id,
      },
    });
    yield put(employeeLoaded(employees.data));
    yield socket.emit(socketTypes.UPDATE_EMPLOYEE);
  } catch (err) {
    console.log(err);
  }
}

function* getUser() {
  try {
    const users = yield call(request, `${generalRest.user}`);
    yield put(userLoaded(users));
  } catch (err) {
    console.log(err);
  }
}

function* deleteUser(socket, action) {
  try {
    const { token, id } = action;
    const users = yield axios.delete(`${generalRest.user}`, {
      params: {
        token,
        id,
      },
    });
    yield put(userLoaded(users.data));
    yield socket.emit(socketTypes.UPDATE_USER);
  } catch (err) {
    console.log(err);
  }
}

function* watchGeneral() {
  const channelGetEmployee = yield actionChannel(ActionTypes.GENERAL_EMPLOYEE_REQUEST, buffers.sliding(1));
  const channelGetUser = yield actionChannel(ActionTypes.GENERAL_USER_REQUEST, buffers.sliding(1));
  const socket = yield call(connect);
  const watcherEmployee = yield takeLatest(channelGetEmployee, getEmployee);
  const watcherUser = yield takeLatest(channelGetUser, getUser);
  const watcherDeleteEmployee = yield takeLatest(ActionTypes.GENERAL_EMPLOYEE_DELETE_REQUEST, deleteEmployee, socket);
  const watcherDeleteUser = yield takeLatest(ActionTypes.GENERAL_USER_DELETE_REQUEST, deleteUser, socket);

  const watcherSocket = yield fork(handleIO, socket);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherEmployee);
  yield cancel(watcherUser);
  yield cancel(watcherDeleteEmployee);
  yield cancel(watcherDeleteUser);
  yield cancel(watcherSocket);
  yield fork(disconnect, socket);
}

export default [
  watchGeneral,
];
