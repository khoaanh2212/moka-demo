/**
 * get list of employee
 */
import { eventChannel, buffers } from 'redux-saga';
import { fork, take, call, put, takeLatest, cancel, actionChannel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import axios from 'axios';
import io from 'socket.io-client';
import { ActionTypes, employeeLoaded, employeeRefresh } from './actions';
import { apiRest as employeeRest } from './apiRest';
import { socketTypes } from './sockets';

export function* getEmployees() {
  try {
    const employees = yield call(request, employeeRest.root);// can use fork in here to see what different of call and fork in redux saga
    yield put(employeeLoaded(employees));
  } catch (err) {
    console.log(err);
  }
}

export function* deleteEmployee(socket, action) {
  try {
    const id = action.id;
    const token = action.token;
    const employees = yield axios.delete(`${employeeRest.root}`, {
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

function connect() {
  const socket = io('http://localhost:8000');
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
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

/**
 * Root saga manages watcher lifecycle
 */
export function* watchEmployee() {
  // delay takeLatest EMPLOYEE_REQUEST after socket connect
  const channelRequest = yield actionChannel(ActionTypes.EMPLOYEE_REQUEST, buffers.sliding(1));

  const socket = yield call(connect);
  const watcher = yield takeLatest(channelRequest, getEmployees);
  const watcherDelete = yield takeLatest(ActionTypes.EMPLOYEE_DELETE_REQUEST, deleteEmployee, socket);
  const watchSocket = yield fork(handleIO, socket);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherDelete);
  yield cancel(watchSocket);
  yield call(disconnect, socket);
}


// Bootstrap sagas
export default [
  watchEmployee,
];
