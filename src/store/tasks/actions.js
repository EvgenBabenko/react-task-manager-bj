import axios from 'axios';

import types from './types';
import HTTP from '../../helpers/httpCommon';
import actionCreaters from '../../helpers/actionCreaters';
import store from '../store';
import config from '../../config';
import generateSignature from '../../services/generateSignature';
import blobUrl from '../../services/blobUrl';

const index = id => store.getState().tasks.taskList.findIndex(task => task._id === id);

export const getTaskList = (sortField, page) => (dispatch) => {
  const { sortBy, currentPage } = store.getState().tasks;

  dispatch(actionCreaters('GET_TASK_LIST', () => HTTP().get('/', {
    params: {
      sort_field: sortField || sortBy,
      page: page || currentPage,
    },
  })));
};

export const changeSortField = data => (dispatch) => {
  dispatch(getTaskList(data));

  dispatch({ type: types.CHANGE_SORT_FIELD, data });
};

export const changePage = data => (dispatch) => {
  dispatch(getTaskList(false, data));

  dispatch({ type: types.CHANGE_PAGE, data });
};

export const updateTask = (id, payload) => async (dispatch) => {
  const { text, status } = payload;

  console.log(Number(status), config.token);

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
      url: `/edit/${id}?developer=hh`,
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(data)

    // dispatch({ type: 'ADD_TASK_SUCCESS', data, index });
    dispatch(actionCreaters('GET_TASK_LIST', () => HTTP().get('/', {
      params: {
        page: data,
      },
    })));

  } catch (error) {
    dispatch({ type: 'ADD_TASK_FAILURE', error });
  }
};

export const addTask = payload => async (dispatch) => {
  const { username, email, text, image } = payload;

  console.log('image', image);

  // const res = await resizeImageBeforeUpload(image);

  // console.log('image', res);

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
      url: '/create?developer=hh',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(data)

    dispatch({ type: 'ADD_TASK_SUCCESS', data, index });
  } catch (error) {
    dispatch({ type: 'ADD_TASK_FAILURE', error });
  }
};
