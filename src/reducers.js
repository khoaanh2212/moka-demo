import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as modalReducer } from 'containers/DialogsContainer/reducer';
import reducer from 'containers/LoginPage/reducer';
import { apolloClient } from './apollo';


// Initial routing state
const routeInitialState = {
  locationBeforeTransitions: null,
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return { ...state, locationBeforeTransitions: action.payload };
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  const appReducers = combineReducers({
    apollo: apolloClient.reducer(),
    form: formReducer,
    routing: routeReducer,
    toastr: toastrReducer,
    modal: modalReducer,
    login: reducer, // load more login reducer to pass value from localstorage into it
    ...asyncReducers,
  });

  const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
      const { routing } = state; // Remain some state
      // state = { routing }; // eslint-disable-line no-param-reassign
    }

    return appReducers(state, action);
  };

  return rootReducer;
}
