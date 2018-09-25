import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import tasks from './tasks/reducers';
import users from './users/reducers';
import common from './common/reducers';

export default combineReducers({
  tasks,
  users,
  common,
  form: formReducer,
});
