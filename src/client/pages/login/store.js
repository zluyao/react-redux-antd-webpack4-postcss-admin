import Deferred from '$lib/deferred';
import { createReducer, injectReducer } from '$lib/dataManager';

export const key = 'login';

const AUTH_ASYNC = `${key}/AUTH_ASYNC`;

export default {
  authAsync: () => dispatch => {
    const defer = Deferred();

    setTimeout(() => {
      dispatch({
        type: AUTH_ASYNC,
        payload: null,
      });

      defer.resolve();
    }, 2000);

    return defer.promise;
  },

  // authAsync同authAsync2
  authAsync2: () => dispatch => {

    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: AUTH_ASYNC,
          payload: null,
        });

        resolve();
      }, 2000);
    });
  },
};

const reducers = {
  [AUTH_ASYNC]: state => ({
    ...state,
    isAuthed: true,
  }),
};

const initalState = {
  isAuthed: false,
};

injectReducer(key, createReducer(initalState, reducers));
