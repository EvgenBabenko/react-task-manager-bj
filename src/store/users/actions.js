import types from './types';
import history from '../../helpers/history';
import config from '../../config';

export const login = payload => async (dispatch) => {
  const { userLogin, userPassword } = payload;

  if (userLogin === config.adminLogin && userPassword === config.adminPass) {
    dispatch({ type: types.LOGIN, isAdmin: true });
  } else {
    dispatch({ type: types.LOGIN, isAdmin: false });
  }

  history.push('/');
};

export const logout = () => ({ type: types.LOGOUT });
