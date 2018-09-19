import axios from 'axios';
import md5 from 'md5';

import types from './types';
import HTTP from '../../helpers/httpCommon';
import actionCreaters from '../../helpers/actionCreaters';
import store from '../store';
import config from '../../config';

const index = id => store.getState().tasks.taskList.findIndex(task => task._id === id);

export const getTaskList = () => actionCreaters('GET_TASK_LIST', () => HTTP().get('/'));

export const changeSortField = data => (dispatch) => {
  dispatch(actionCreaters('GET_TASK_LIST', () => HTTP().get('/', {
    params: {
      sort_field: data,
    },
  })));

  dispatch({ type: types.CHANGE_SORT_FIELD, data });
};

export const changePage = data => (dispatch) => {
  dispatch(actionCreaters('GET_TASK_LIST', () => HTTP().get('/', {
    params: {
      page: data,
    },
  })));

  dispatch({ type: types.CHANGE_PAGE, data });
};

const fixedEncodeURIComponent = str => encodeURIComponent(str)
  .replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16));

export const updateTask = (id, payload) => async (dispatch) => {
  const { text, status } = payload;

  console.log(payload, config.token);


  const gatheringFormData = {
    text,
    status,
  };

  const sortedFormData = Object
    .keys(gatheringFormData)
    .reduce((acc, key) => acc.concat({ key, value: gatheringFormData[key] }), [])
    .sort((a, b) => a.key > b.key);

  const paramsString = sortedFormData
    .slice()
    .concat({ key: 'token', value: config.token })
    .map((elem) => {
      elem.key = fixedEncodeURIComponent(elem.key);
      elem.value = fixedEncodeURIComponent(elem.value);

      return elem;
    })
    .reduce((acc, elem) => acc.concat(`${elem.key}=${elem.value}`), [])
    .join('&');

  const form = new FormData();
  form.append('text', text);
  form.append('status', status);
  form.append('token', config.token);
  form.append('signature', md5(paramsString));

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

  console.log(payload)

  const form = new FormData();
  form.append('username', username);
  form.append('email', email);
  form.append('text', text);
  form.append('image', image);

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
