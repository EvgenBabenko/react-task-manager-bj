import types from './types';
import createReducers from '../../helpers/createReducers';

const initialState = {
  isLogin: false,
  isAdmin: false,
};

const actions = {
  [types.LOGIN]: (state, action) => ({ ...state, isLogin: true, isAdmin: action.isAdmin }),
  [types.LOGOUT]: state => ({ ...state, isLogin: false, isAdmin: false }),
};

export default createReducers(initialState, actions);
