import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { apiRest as loginRest } from './apiRest';

export const ActionTypes = {};


ActionTypes.LOGIN_REQUEST = 'LOGIN_PAGE/LOGIN_REQUEST';
ActionTypes.LOGIN_SUCCESS = 'LOGIN_PAGE/LOGIN_SUCCESS';
ActionTypes.LOGIN_FAILURE = 'LOGIN_PAGE/LOGIN_FAILURE';

export const loginRequest = ({ username = 'demo@8bitrockstar', password = 'password' }) => (dispatch) => {
  dispatch({ type: ActionTypes.LOGIN_REQUEST });
  axios.post(`${loginRest.root}`,
    {
      username,
      password,
    }
  )
    .then((result) => {
      toastr.success('Login success');
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: result.data });
    })
    .catch((err) => {
      toastr.error('Login failure');
      console.error(err);
    });
};

export const authRequest = ({ username = 'demo@8bitrockstar', password = 'password' }) => (dispatch) => {
  dispatch({ type: ActionTypes.LOGIN_REQUEST, username, password });
};

export function loginSuccess(result) {
  toastr.success('Login Success!');
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: result,
  };
}

export function loginFailed() {
  toastr.error('Login Failed!');
  return {
    type: ActionTypes.LOGIN_FAILURE,
  };
}
