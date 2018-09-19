import types from './types';
import createReducers from '../../helpers/createReducers';

const initialState = {
  isRequest: false,
  taskList: [],
  sortBy: '',
  currentPage: 1,
  totalTaskCount: null,
  error: null,
};

const actions = {
  [types.GET_TASK_LIST_REQUEST]: state => ({ ...state, isRequest: true }),
  [types.GET_TASK_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isRequest: false,
    taskList: action.data.message.tasks,
    totalTaskCount: Number(action.data.message.total_task_count),
  }),
  [types.GET_TASK_LIST_FAILURE]: (state, action) => ({
    ...state,
    isRequest: false,
    error: action.error,
  }),
  [types.ADD_TASK_REQUEST]: state => ({ ...state, isRequest: true }),
  [types.ADD_TASK_SUCCESS]: (state, action) => ({
    ...state,
    isRequest: false,
    taskList: state.taskList.concat(action.data.message),
  }),
  [types.ADD_TASK_FAILURE]: (state, action) => ({
    ...state,
    isRequest: false,
    error: action.error,
  }),
  [types.UPDATE_TASK_REQUEST]: state => ({ ...state, isRequest: true }),
  [types.UPDATE_TASK_SUCCESS]: (state, action) => ({
    ...state,
    isRequest: false,
    taskList: [
      ...state.taskList.slice(0, action.index),
      action.data.message,
      ...state.taskList.slice(action.index + 1),
    ],
  }),
  [types.UPDATE_TASK_FAILURE]: (state, action) => ({
    ...state,
    isRequest: false,
    error: action.error,
  }),
  [types.CHANGE_SORT_FIELD]: (state, action) => ({ ...state, sortBy: action.data }),
  [types.CHANGE_PAGE]: (state, action) => ({ ...state, currentPage: action.data }),
};

export default createReducers(initialState, actions);
