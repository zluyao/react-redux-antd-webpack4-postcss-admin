import _ from 'underscore';
import thunk from 'redux-thunk';
import { connect as originalConnect } from 'react-redux';
import { applyMiddleware, compose, createStore as createOriginslStore, combineReducers } from 'redux';

let rootStore = null;

export const injectReducer = (key, reducer) => {
  if (!rootStore) {
    throw new Error('The store must be initialized first.');
  }

  if (_.has(rootStore.asyncReducers, key)) {
    return;
  }

  rootStore.asyncReducers[key] = reducer;
  rootStore.replaceReducer(combineReducers(rootStore.asyncReducers));
};

export const createReducer = (initialState, reducers) => (
  (state = initialState, action) => {
    const handler = reducers[action.type];
    return handler ? handler(state, action.payload) : state;
  }
);

export const createStore = (initialState = {}, initialReducer = {}) => {
  const middlewares = [thunk];

  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createOriginslStore(
    combineReducers(initialReducer),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers,
    ),
  );

  store.asyncReducers = {
    ...initialReducer,
  };
  rootStore = store;

  return store;
};

export const connect = (mapStateToProps, actions) =>
  Component => originalConnect(mapStateToProps, actions)(Component);
