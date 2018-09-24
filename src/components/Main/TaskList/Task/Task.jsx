import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import T from 'prop-types';

import EditTaskForm from './EditTaskForm/EditTaskForm';

const styles = {
  alignedItem: {
    display: 'block',
  },
  taskCompleted: {
    backgroundColor: 'lightgreen',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
};

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditTask: false,
    };

    this.handleOpenEditTask = this.handleOpenEditTask.bind(this);
    this.handleCloseEditTask = this.handleCloseEditTask.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
  }

  handleTaskUpdate(values) {
    const { updateTask, id } = this.props;

    updateTask(id, values);

    this.handleCloseEditTask();
  }

  handleOpenEditTask() {
    this.setState({ isEditTask: true });
  }

  handleCloseEditTask() {
    this.setState({ isEditTask: false });
  }

  render() {
    const {
      username, email, text, image_path, status, isAdmin, classes,
    } = this.props;
    const { isEditTask } = this.state;

    return (
      <React.Fragment>
        {!isEditTask
          ? (
            <div className={status === 10 ? 'taskDone' : ''}>
              {status === 10 && <h2 className={classes.taskCompleted}>Task completed!</h2>}
              <p>
                {'User name: '}
                {username}
              </p>
              <p>
                {'User email: '}
                {email}
              </p>
              <p>
                {'Task description: '}
                {text}
              </p>
              <img src={image_path} alt="" />

              {isAdmin
                && (
                  <Button type="submit" onClick={this.handleOpenEditTask} color="primary" className={classes.alignedItem}>
                    Edit a task
                  </Button>
                )
              }
            </div>
          )
          : (
            <EditTaskForm
              initialValues={this.props}
              onSubmit={this.handleTaskUpdate}
              handleCloseEditTask={this.handleCloseEditTask}
            />
          )
        }
      </React.Fragment>
    );
  }
}

Task.propTypes = {
  classes: T.objectOf(T.any).isRequired,
  username: T.string.isRequired,
  email: T.string.isRequired,
  text: T.string.isRequired,
  image_path: T.string.isRequired,
  status: T.number.isRequired,
  isAdmin: T.bool.isRequired,
  updateTask: T.func.isRequired,
  id: T.number.isRequired,
};

export default withStyles(styles)(Task);
