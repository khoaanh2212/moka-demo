import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { apiRest as userRest } from './apiRest';

export const ActionTypes = {};
ActionTypes.USER_REQUEST = 'USER_PAGE/REQUEST';
ActionTypes.USER_REQUEST_SUCCESS = 'USER_PAGE/REQUEST_SUCCESS';
ActionTypes.USER_REFRESH_SUCCESS = 'USER_PAGE/REFRESH_SUCCESS';
ActionTypes.USER_DELETE_REQUEST = 'USER_PAGE/DELETE_REQUEST';
ActionTypes.USER_DELETE_SUCCESS = 'USER_PAGE/DELETE_SUCCESS';

export const requestUser = (token) => (dispatch) => {
  dispatch({ type: ActionTypes.USER_REQUEST });
  axios.get(`${userRest.root}`, {
    token,
  })
    .then((result) => {
      dispatch({ type: ActionTypes.USER_REQUEST_SUCCESS, payload: result.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = (token, id) => (dispatch) => {
  dispatch({ type: ActionTypes.USER_DELETE_REQUEST });
  axios.delete(`${userRest.root}`, {
    params: {
      token,
      id,
    },
  })
    .then((result) => {
      toastr.success('Delete user success!');
      dispatch({ type: ActionTypes.USER_DELETE_SUCCESS, payload: result.data });
    })
    .catch((err) => {
      toastr.error('Delete user error!');
      console.log(err);
    });
};

export const getUser = () => (dispatch) => {
  dispatch({ type: ActionTypes.USER_REQUEST });
};

export const requestDeleteUser = (token, id) => (dispatch) => dispatch({
  type: ActionTypes.USER_DELETE_REQUEST,
  token,
  id,
});

export function userLoaded(users) {
  return {
    type: ActionTypes.USER_REQUEST_SUCCESS,
    payload: users,
  };
}

export function userRefreshed(users) {
  console.log(users);
  return {
    type: ActionTypes.USER_REFRESH_SUCCESS,
    payload: users,
  };
}
