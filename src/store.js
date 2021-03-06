import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';
import createReducer from './reducers';
import injectCookiesMiddleware from './middlewares/injectCookiesMiddleware';

import '../assets/baseCss/_base.scss';

const sagaMiddleware = createSagaMiddleware();
export default function configureStore(initialState, history) {
  // Create the store with two middlewares default
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    thunk,
    routerMiddleware(history),
    injectCookiesMiddleware,
    apiMiddleware,
  ];
  if (process.env.NODE_ENV !== 'dev') {
    // middlewares.push(createLogger());
  }


  const enhancers = [
    applyMiddleware(...middlewares),
  ];


  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);
        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
