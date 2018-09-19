import axios from 'axios';

import types from './types';
import HTTP from '../../helpers/httpCommon';
import actionCreaters from '../../helpers/actionCreaters';
import store from '../store';
import config from '../../config';
import generateSignature from '../../services/generateSignature';
import blobUrl from '../../services/blobUrl';

export const getTaskList = (sortField, sortDir, page) => (dispatch) => {
  const { sortByField, currentPage, sortDirection } = store.getState().tasks;

  dispatch(actionCreaters('GET_TASK_LIST', () => HTTP().get('/', {
    params: {
      sort_field: sortField || sortByField,
      sort_direction: sortDir || sortDirection,
      page: page || currentPage,
    },
  })));
};

export const changeSortField = data => (dispatch) => {
  dispatch(getTaskList(data));

  dispatch({ type: types.CHANGE_SORT_FIELD, data });
};

export const changeSortDirection = data => (dispatch) => {
  dispatch(getTaskList(false, data));

  dispatch({ type: types.CHANGE_SORT_DIRECTION, data });
};

export const changePage = data => (dispatch) => {
  dispatch(getTaskList(false, false, data));

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
    const data = await axios({
      method: 'post',
      url: `/edit/${id}`,
      params: {
        developer: config.developer,
      },
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

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

  console.log('image', image);

  const res = await blobUrl(image);
  console.log(res);

  const form = new FormData();
  form.append('username', username);
  form.append('email', email);
  form.append('text', text);
  form.append('image', res);

  try {
    const { data } = await axios({
      method: 'post',
      url: '/create',
      params: {
        developer: config.developer,
      },
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({ type: types.ADD_TASK_SUCCESS });

    dispatch(getTaskList());
  } catch (error) {
    dispatch({ type: types.ADD_TASK_FAILURE, error });
  }
};
