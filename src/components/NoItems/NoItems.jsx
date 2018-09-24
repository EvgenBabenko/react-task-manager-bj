import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const NoItems = ({ classes }) => (
  <div className={classes.root}>
    <h1>No Items for now</h1>
  </div>
);

NoItems.propTypes = {
  classes: T.objectOf(T.string).isRequired,
};

export default withStyles(styles)(NoItems);
