import types from './types';
import HTTP from '../../helpers/httpCommon';
import store from '../store';
import config from '../../config';
import generateSignature from '../../services/generateSignature';
import blobUrl from '../../services/blobUrl';
import { createNotifyMessage, clearNotifyMessage } from '../common/actions';

export const getTaskList = (sortField, sortDir, page) => async (dispatch) => {
  dispatch({ type: types.GET_TASK_LIST_REQUEST });

  try {
    const { sortByField, currentPage, sortDirection } = store.getState().tasks;

    const { data } = await HTTP.get('/', {
      params: {
        sort_field: sortField || sortByField,
        sort_direction: sortDir || sortDirection,
        page: page || currentPage,
      },
    });

    if (data.status === 'ok') {
      dispatch({ type: types.GET_TASK_LIST_SUCCESS, data: data.message });
    } else {
      dispatch({ type: types.GET_TASK_LIST_FAILURE });

      dispatch(createNotifyMessage(data.message));
    }
  } catch (error) {
    dispatch({ type: types.GET_TASK_LIST_FAILURE });

    dispatch(createNotifyMessage('Network error'));
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

  dispatch(clearNotifyMessage());

  const { text, status } = payload;

  const taskStatus = status ? 10 : 0;

  const gatheringFormData = {
    text,
    status: taskStatus,
  };

  const form = new FormData();
  form.append('text', text);
  form.append('status', taskStatus);
  form.append('token', config.token);
  form.append('signature', generateSignature(gatheringFormData, { key: 'token', value: config.token }));

  try {
    const { data } = await HTTP.post(`/edit/${id}`, form);

    if (data.status === 'ok') {
      dispatch({ type: types.UPDATE_TASK_SUCCESS });

      dispatch(createNotifyMessage('Task updated successfully'));

      dispatch(getTaskList());
    } else {
      dispatch({ type: types.UPDATE_TASK_FAILURE });

      dispatch(createNotifyMessage(data.message));
    }
  } catch (error) {
    dispatch({ type: types.UPDATE_TASK_FAILURE });

    dispatch(createNotifyMessage('Network error'));
  }
};

export const addTask = payload => async (dispatch) => {
  dispatch({ type: types.ADD_TASK_REQUEST });

  dispatch(clearNotifyMessage());

  const {
    username, email, text, image,
  } = payload;

  if (!image) {
    dispatch({ type: types.ADD_TASK_FAILURE });

    dispatch(createNotifyMessage('Image not attached'));

    return;
  }

  const res = await blobUrl(image);

  const form = new FormData();
  form.append('username', username);
  form.append('email', email);
  form.append('text', text);
  form.append('image', res);

  try {
    const { data } = await HTTP.post('/create', form);

    if (data.status === 'ok') {
      dispatch({ type: types.ADD_TASK_SUCCESS });

      dispatch(createNotifyMessage('Task added successfully'));

      dispatch(getTaskList());
    } else {
      dispatch({ type: types.ADD_TASK_FAILURE });

      const messagesKeys = Object.keys(data.message);

      dispatch(createNotifyMessage(data.message[messagesKeys[0]]));
    }
  } catch (error) {
    dispatch({ type: types.ADD_TASK_FAILURE });

    dispatch(createNotifyMessage('Network error'));
  }
};
