export const ActionTypes = {};
ActionTypes.GENERAL_EMPLOYEE_REQUEST = 'GENERAL_PAGE/EMPLOYEE_REQUEST';
ActionTypes.GENERAL_EMPLOYEE_REQUEST_SUCCESS = 'GENERAL_PAGE/EMPLOYEE_REQUEST_SUCCESS';
ActionTypes.GENERAL_EMPLOYEE_DELETE_REQUEST = 'GENERAL_PAGE/EMPLOYEE_DELETE_REQUEST';
ActionTypes.GENERAL_EMPLOYEE_DELETE_REQUEST_SUCCESS = 'GENERAL_PAGE/EMPLOYEE_DELETE_REQUEST_SUCCESS';
ActionTypes.GENERAL_EMPLOYEE_REFRESH_REQUEST_SUCCESS = 'GENERAL_PAGE/EMPLOYEE_REFRESH_REQUEST_SUCCESS';
ActionTypes.GENERAL_USER_REQUEST = 'GENERAL_PAGE/USER_REQUEST';
ActionTypes.GENERAL_USER_REQUEST_SUCCESS = 'GENERAL_PAGE/USER_REQUEST_SUCCESS';
ActionTypes.GENERAL_USER_DELETE_REQUEST = 'GENERAL_PAGE/USER_DELETE_REQUEST';
ActionTypes.GENERAL_USER_DELETE_REQUEST_SUCCESS = 'GENERAL_PAGE/USER_DELETE_REQUEST_SUCCESS';
ActionTypes.GENERAL_USER_REFRESH_REQUEST_SUCCESS = 'GENERAL_PAGE/USER_REFRESH_REQUEST_SUCCESS';

export const requestGetEmployee = () => (dispatch) => {
  dispatch({ type: ActionTypes.GENERAL_EMPLOYEE_REQUEST });
};

export const requestDeleteEmployee = (token, id) => (dispatch) => {
  dispatch({ type: ActionTypes.GENERAL_EMPLOYEE_DELETE_REQUEST, token, id });
};

export const employeeLoaded = (employees) => ({
  type: ActionTypes.GENERAL_EMPLOYEE_REQUEST_SUCCESS,
  payload: employees,
});


export const employeeRefresh = (employees) => ({
  type: ActionTypes.GENERAL_EMPLOYEE_REFRESH_REQUEST_SUCCESS,
  payload: employees,
});

export const requestGetUser = () => (dispatch) => {
  dispatch({ type: ActionTypes.GENERAL_USER_REQUEST });
};

export const requestDeleteUser = (token, id) => (dispatch) => {
  dispatch({ type: ActionTypes.GENERAL_USER_DELETE_REQUEST, token, id });
};

export const userLoaded = (users) => ({
  type: ActionTypes.GENERAL_USER_REQUEST_SUCCESS,
  payload: users,
});

export const userRefresh = (users) => ({
  type: ActionTypes.GENERAL_USER_REFRESH_REQUEST_SUCCESS,
  payload: users,
});
