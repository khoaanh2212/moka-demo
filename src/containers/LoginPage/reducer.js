import { ActionTypes } from './actions';

const initialState = {
  isFetching: true,
  user: {},
  error: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.payload.token,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
