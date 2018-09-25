import types from './types';
import createReducers from '../../helpers/createReducers';

const initialState = {
  isLogin: false,
  isAdmin: false,
  profile: null,
};

const actions = {
  [types.LOGIN]: (state, action) => ({
    ...state, isLogin: true, isAdmin: action.isAdmin, profile: action.profile,
  }),
  [types.LOGOUT]: state => ({
    ...state, isLogin: false, isAdmin: false, profile: null,
  }),
};

export default createReducers(initialState, actions);
