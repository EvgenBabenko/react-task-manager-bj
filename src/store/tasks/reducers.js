import types from './types';
import createReducers from '../../helpers/createReducers';

const initialState = {
  isRequest: false,
  taskList: [],
  sortByField: 'id',
  sortDirection: 'asc',
  currentPage: 1,
  totalTaskCount: null,
  error: null,
};

const actions = {
  [types.GET_TASK_LIST_REQUEST]: state => ({ ...state, isRequest: true }),
  [types.GET_TASK_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isRequest: false,
    taskList: action.data.tasks,
    totalTaskCount: Number(action.data.total_task_count),
  }),
  [types.GET_TASK_LIST_FAILURE]: (state, action) => ({
    ...state,
    isRequest: false,
    error: action.error,
  }),
  [types.ADD_TASK_REQUEST]: state => ({ ...state, isRequest: true }),
  [types.ADD_TASK_SUCCESS]: state => ({ ...state, isRequest: false }),
  [types.ADD_TASK_FAILURE]: (state, action) => ({
    ...state,
    isRequest: false,
    error: action.error,
  }),
  [types.UPDATE_TASK_REQUEST]: state => ({ ...state, isRequest: true }),
  [types.UPDATE_TASK_SUCCESS]: state => ({ ...state, isRequest: false }),
  [types.UPDATE_TASK_FAILURE]: (state, action) => ({
    ...state,
    isRequest: false,
    error: action.error,
  }),
  [types.CHANGE_SORT_FIELD]: (state, action) => ({ ...state, sortByField: action.data }),
  [types.CHANGE_SORT_DIRECTION]: (state, action) => ({ ...state, sortDirection: action.data }),
  [types.CHANGE_PAGE]: (state, action) => ({ ...state, currentPage: action.data }),
};

export default createReducers(initialState, actions);
