import { ActionTypes } from './actions';

const initialState = {
  isFetching: false,
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.USER_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload,
      };

    case ActionTypes.USER_REFRESH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload,
      };

    case ActionTypes.USER_DELETE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.USER_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
