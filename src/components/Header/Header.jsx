import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AuthButtonContainer from '../../containers/AuthButton';
import HomeButton from './HomeButton/HomeButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

const Header = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <HomeButton />

          <Typography variant="title" color="inherit" className={classes.flex}>
            Task manager
          </Typography>

          <AuthButtonContainer />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: T.objectOf(T.string).isRequired,
};

export default withStyles(styles)(Header);
