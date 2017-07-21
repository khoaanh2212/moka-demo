import { push } from 'react-router-redux';
import {
  ActionTypes,
} from '../containers/LoginPage/actions';


export default (store) => (next) => (action) => {
  const nextAction = next(action);
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      // store.dispatch(push('/employee'));
      break;
    default:

  }
  return nextAction;
};

