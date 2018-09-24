import types from './types';
import HTTP from '../../helpers/httpCommon';
import store from '../store';
import config from '../../config';
import generateSignature from '../../services/generateSignature';
import blobUrl from '../../services/blobUrl';

export const getTaskList = (sortField, sortDir, page) => async (dispatch) => {
  const { sortByField, currentPage, sortDirection } = store.getState().tasks;

  dispatch({ type: 'GET_TASK_LIST_REQUEST' });

  try {
    const { data } = await HTTP.get('/', {
      params: {
        sort_field: sortField || sortByField,
        sort_direction: sortDir || sortDirection,
        page: page || currentPage,
      },
    });

    dispatch({ type: 'GET_TASK_LIST_SUCCESS', data });
  } catch (error) {
    dispatch({ type: 'GET_TASK_LIST_FAILURE', error });
  }
};

export const changeSortField = data => (dispatch) => {
  dispatch(getTaskList(data));

  dispatch({ type: types.CHANGE_SORT_FIELD, data });
};

export const changeSortDirection = data => (dispatch) => {
  dispatch(getTaskList(null, data));

  dispatch({ type: types.CHANGE_SORT_DIRECTION, data });
};

export const changePage = data => (dispatch) => {
  dispatch(getTaskList(null, null, data));

  dispatch({ type: types.CHANGE_PAGE, data });
};

export const updateTask = (id, payload) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });

  const { text, status } = payload;

  const gatheringFormData = {
    text,
    status: Number(status),
  };

  const form = new FormData();
  form.append('text', text);
  form.append('status', Number(status));
  form.append('token', config.token);
  form.append('signature', generateSignature(gatheringFormData));

  try {
    await HTTP.post(`/edit/${id}`, form);

    dispatch({ type: types.UPDATE_TASK_SUCCESS });

    dispatch(getTaskList());
  } catch (error) {
    dispatch({ type: types.UPDATE_TASK_FAILURE, error });
  }
};

export const addTask = payload => async (dispatch) => {
  dispatch({ type: types.ADD_TASK_REQUEST });

  const {
    username, email, text, image,
  } = payload;

  const res = await blobUrl(image);

  const form = new FormData();
  form.append('username', username);
  form.append('email', email);
  form.append('text', text);
  form.append('image', res);

  try {
    await HTTP.post('/create', form);

    dispatch({ type: types.ADD_TASK_SUCCESS });

    dispatch(getTaskList());
  } catch (error) {
    dispatch({ type: types.ADD_TASK_FAILURE, error });
  }
};
