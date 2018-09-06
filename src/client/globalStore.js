
import { createReducer, createStore } from '$lib/dataManager';

export const key = 'global';

const SET_USER_INFO = `${key}/SET_USER_INFO`;

export default {
  setUserInfo: v => ({
    type: SET_USER_INFO,
    payload: v,
  }),
};

const initialState = {
  userInfo: null,
};

const reducers = createReducer(initialState, {
  [SET_USER_INFO]: (state, userInfo) => {
    // debugger;
    return {
      ...state,
      userInfo,
    };
  },
});

export const store = createStore({}, { [key]: reducers });
