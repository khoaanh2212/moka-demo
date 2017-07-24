import { ActionTypes } from './actions';

const initialState = {
  employee: {
    isFetching: false,
    employees: [],
  },
  user: {
    isFetching: false,
    users: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GENERAL_EMPLOYEE_REQUEST: {
      return {
        ...state,
        employee: { ...state.employee, isFetching: true },
      };
    }
    case ActionTypes.GENERAL_EMPLOYEE_REQUEST_SUCCESS: {
      return {
        ...state,
        employee: { ...state.employee, isFetching: false, employees: action.payload },
      };
    }
    case ActionTypes.GENERAL_EMPLOYEE_DELETE_REQUEST:
      return {
        ...state,
        employee: { ...state.employee, isFetching: true },
      };
    case ActionTypes.GENERAL_EMPLOYEE_DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        employee: { ...state.employee, isFetching: false, employees: action.payload },
      };
    case ActionTypes.GENERAL_EMPLOYEE_REFRESH_REQUEST_SUCCESS:
      return {
        ...state,
        employee: { ...state.employee, employees: action.payload },
      };

    case ActionTypes.GENERAL_USER_REQUEST: {
      return {
        ...state,
        user: { ...state.user, isFetching: true },
      };
    }
    case ActionTypes.GENERAL_USER_REQUEST_SUCCESS: {
      return {
        ...state,
        user: { ...state.user, isFetching: false, users: action.payload },
      };
    }
    case ActionTypes.GENERAL_USER_DELETE_REQUEST:
      return {
        ...state,
        user: { ...state.user, isFetching: true },
      };
    case ActionTypes.GENERAL_USER_DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        user: { ...state.user, isFetching: false, users: action.payload },
      };
    case ActionTypes.GENERAL_USER_REFRESH_REQUEST_SUCCESS:
      return {
        ...state,
        user: { ...state.user, users: action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
