/**
 * get list of user
 */
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, takeLatest, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import axios from 'axios';
import request from 'utils/request';
import io from 'socket.io-client';
import { ActionTypes, userLoaded, userRefreshed } from './actions';
import { apiRest as userRest } from './apiRest';
import { socketTypes } from './sockets';


let socketGlobal = null;

export function* getUsers() {
  try {
    const users = yield call(request, userRest.root);
    yield put(userLoaded(users));
  } catch (err) {
    console.log(err);
  }
}

export function* deleteUser(action) {
  try {
    const { token, id } = action;
    const users = yield axios.delete(`${userRest.root}`, {
      params: {
        token,
        id,
      },
    });
    yield put(userLoaded(users.data));
    yield socketGlobal.emit(socketTypes.UPDATE_USER);
  } catch (err) {
    console.log(err);
  }
}

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

    socket.on(socketTypes.CHANGE_USER, (data) => {
      emit(userRefreshed(data));
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
export function* watchUser() {
  const watcher = yield takeLatest(ActionTypes.USER_REQUEST, getUsers);
  socketGlobal = yield call(connect);
  const watcherDeleteUser = yield takeLatest(ActionTypes.USER_DELETE_REQUEST, deleteUser);

  const socketWatcher = yield fork(handleIO, socketGlobal);


  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherDeleteUser);
  yield cancel(socketWatcher);
  yield fork(disconnect, socketGlobal);
}


// Bootstrap sagas
export default [
  watchUser,
];
