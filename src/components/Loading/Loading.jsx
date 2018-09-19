import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  progressWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const Loading = ({ classes }) => (
  <div className={classes.progressWrapper}>
    <CircularProgress className={classes.progress} size={50} />
  </div>
);

Loading.propTypes = {
  classes: T.objectOf(T.any).isRequired,
};

export default withStyles(styles)(Loading);
