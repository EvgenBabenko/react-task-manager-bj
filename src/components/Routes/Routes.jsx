import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import history from '../../helpers/history';
import TaskListContainer from '../../containers/Tasks/TaskList';
import LoginContainer from '../../containers/Auth/Login';
import _404 from './404/404';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={TaskListContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route component={_404} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
