import { CALL_API } from 'redux-api-middleware';

/**
 * Inject credentials header to fetch api call.
 *
 */
export default (store) => (next) => (action) => { // eslint-disable-line no-unused-vars
  const callApi = action[CALL_API];

  // Check if this action is a redux-api-middleware action.
  if (callApi) {
    // Inject the Authorization header from localStorage.
    if (!callApi.credentials) {
      callApi.credentials = 'same-origin';
    }
  }
  // Pass the FSA to the next action.
  return next(action);
};
