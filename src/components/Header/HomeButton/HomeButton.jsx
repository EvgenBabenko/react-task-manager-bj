import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import history from '../../../helpers/history';

const styles = {
  menuButton: {
    marginRight: 20,
  },
};

const HomeButton = (props) => {
  const { classes } = props;

  function handleRedirect() {
    history.push('/');
  }

  return (
    <Tooltip title="Home">
      <Button onClick={handleRedirect} color="primary" variant="fab" mini className={classes.menuButton}>
        <Icon>
          home
        </Icon>
      </Button>
    </Tooltip>
  );
};

HomeButton.propTypes = {
  classes: T.objectOf(T.string).isRequired,
};

export default withStyles(styles)(HomeButton);
