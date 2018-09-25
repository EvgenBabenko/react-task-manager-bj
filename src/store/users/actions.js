import types from './types';
import history from '../../helpers/history';
import mockUsersDB from '../../mockUsersDB.json';
import { createNotifyMessage } from '../common/actions';

export const login = payload => async (dispatch) => {
  const { userLogin, userPassword } = payload;

  if (userLogin in mockUsersDB && userPassword === mockUsersDB[userLogin].password) {
    dispatch({
      type: types.LOGIN,
      isAdmin: mockUsersDB[userLogin].role === 'admin',
      profile: { username: userLogin, email: mockUsersDB[userLogin].email },
    });

    history.push('/');
  } else if (userLogin in mockUsersDB) {
    dispatch(createNotifyMessage('Incorrect login or password'));
  } else {
    dispatch(createNotifyMessage('Incorrect login or password'));
  }
};

export const logout = () => ({ type: types.LOGOUT });
