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

const NotFound = ({ classes }) => (
  <div className={classes.root}>
    <h1>
      404
    </h1>
    <div>
      Sorry, page was not found!
    </div>
  </div>
);

NotFound.propTypes = {
  classes: T.objectOf(T.string).isRequired,
};

export default withStyles(styles)(NotFound);
