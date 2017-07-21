import { actionTypes } from './actions';
const initialState = {
  id: '',
  options: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        ...action.payload,
      };
    case actionTypes.HIDE_MODAL:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
