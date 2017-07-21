import { ActionTypes } from './actions';

const initialState = {
  isFetching: false,
  employees: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.EMPLOYEE_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employees: action.payload,
      };
    case ActionTypes.EMPLOYEE_DELETE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.EMPLOYEE_REFRESH_SUCCESS:
      return {
        ...state,
        employees: action.payload,
      };
    case ActionTypes.EMPLOYEE_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employees: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
