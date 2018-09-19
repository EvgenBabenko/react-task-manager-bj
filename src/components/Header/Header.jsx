import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import history from '../../helpers/history';
import AuthContainer from '../../containers/Auth/Auth';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginRight: 20,
  },
};

const Header = (props) => {
  const { classes } = props;

  function handleRedirect() {
    history.push('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Home">
            <Button onClick={handleRedirect} color="primary" variant="fab" mini className={classes.menuButton}>
              <Icon>
                home
              </Icon>
            </Button>
          </Tooltip>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Task manager
          </Typography>
          <AuthContainer />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: T.objectOf(T.string).isRequired,
};

export default withStyles(styles)(Header);
