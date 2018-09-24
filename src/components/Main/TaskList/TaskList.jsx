import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Task from './Task/Task';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
};

const TaskList = (props) => {
  const {
    taskList, classes, ...othersProps
  } = props;

  return (
    <React.Fragment>
      <div className={classes.root}>
        {taskList.map(task => (
          <Task {...{ key: task.id, ...othersProps, ...task }} />
        ))}
      </div>
    </React.Fragment>
  );
};

TaskList.propTypes = {
  taskList: T.arrayOf(T.any).isRequired,
  classes: T.objectOf(T.any).isRequired,
};

export default withStyles(styles)(TaskList);
