// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import throttle from 'lodash/throttle';
import { AppContainer } from 'react-hot-loader';
import 'ionicons/css/ionicons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { loadState, saveState } from './localStorage';

// AppContainer is a necessary wrapper component for HMR


import createRoutes from './routes';
import App from './containers/App';

import configureStore from './store';

// const initialState = {};
const persistedState = loadState();

const store = configureStore(persistedState, browserHistory);

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState({
    login: state.login,
  });
}, 1000));

let defaultLocation = '';

browserHistory.listen((location) => { // eslint-disable-line no-unused-vars
  // store reset state reducer when move to another component
  if (defaultLocation !== location.pathname) {
    // store.dispatch({ type: 'RESET_STATE' });
  }
  defaultLocation = location.pathname;
});

const history = syncHistoryWithStore(browserHistory, store);

const render = () => {
  // Set up the router, wrapping all Routes in the App component
  const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
  };

  ReactDOM.render(
    <AppContainer key={Math.random()}>
      <Provider store={store}>
        <Router
          history={history}
          routes={rootRoute}
        />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(['./containers/App', './routes'], () => {
    render();
  });
}
