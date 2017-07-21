import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { apiRest as employeeRest } from './apiRest';

export const ActionTypes = {};
ActionTypes.EMPLOYEE_REQUEST = 'EMPLOYEE_PAGE/REQUEST';
ActionTypes.EMPLOYEE_REQUEST_SUCCESS = 'EMPLOYEE_PAGE/REQUEST_SUCCESS';
ActionTypes.EMPLOYEE_REFRESH_SUCCESS = 'EMPLOYEE_PAGE/REFRESH_SUCCESS';
ActionTypes.EMPLOYEE_DELETE_REQUEST = 'EMPLOYEE_PAGE/DELETE_REQUEST';
ActionTypes.EMPLOYEE_DELETE_SUCCESS = 'EMPLOYEE_PAGE/DELETE_SUCCESS';


export const requestEmployee = (token) => (dispatch) => {
  dispatch({ type: ActionTypes.EMPLOYEE_REQUEST });
  axios.get(`${employeeRest.root}`, {
    token,
  })
    .then((result) => {
      // toastr.success('Get Employee Success');
      dispatch({ type: ActionTypes.EMPLOYEE_REQUEST_SUCCESS, payload: result.data });
    })
    .catch((err) => {
      // toastr.error('Get Employee Faild:' + err.message);
      console.log(err);
    });
};

export const deleteEmployee = (token, id) => (dispatch) => {
  dispatch({ type: ActionTypes.EMPLOYEE_DELETE_REQUEST });
  axios.delete(`${employeeRest.root}`, {
    params: {
      token,
      id,
    },
  }).then((result) => {
    toastr.success('delete employee success');
    console.log(result.data);
    dispatch({ type: ActionTypes.EMPLOYEE_DELETE_SUCCESS, payload: result.data });
  })
    .catch((err) => {
      toastr.error('Delete failed');
      console.log(err);
    });
};

export const getEmployee = () => (dispatch) => {
  dispatch({ type: ActionTypes.EMPLOYEE_REQUEST });
};

export const requestDeleteEmployee = (token, id) => (dispatch) => {
  dispatch({ type: ActionTypes.EMPLOYEE_DELETE_REQUEST, token, id });
};

export function employeeLoaded(employees) {
  return {
    type: ActionTypes.EMPLOYEE_REQUEST_SUCCESS,
    payload: employees,
  };
}

export function employeeRefresh(employees) {
  return {
    type: ActionTypes.EMPLOYEE_REFRESH_SUCCESS,
    payload: employees,
  };
}

export function add(a, b) {
  return a + b;
}
