import types from './types';
import createReducers from '../../helpers/createReducers';

const initialState = {
  notifyMessage: null,
};

const actions = {
  [types.CREATE_NOTIFY_MESSAGE]: (state, action) => ({ ...state, notifyMessage: action.message }),
  [types.CLEAR_NOTIFY_MESSAGE]: state => ({ ...state, notifyMessage: null }),
};

export default createReducers(initialState, actions);
