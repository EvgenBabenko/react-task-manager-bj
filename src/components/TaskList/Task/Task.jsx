import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import EditTaskForm from './EditTaskForm/EditTaskForm';
import './Task.css';
// import T from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';

// import Template from './Template/Template';
// import Loading from '../Loading/Loading';

// const styles = {
//   templateListWrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     margin: '0 auto',
//     width: '85%',
//   },
// };

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
    console.log(123,values)
    const { updateTask, id } = this.props;

    updateTask(id, values);

    this.handleCloseEditTask();
  }

  handleOpenEditTask() {
    console.log(111)
    this.setState({ isEditTask: true });
  }

  handleCloseEditTask() {
    this.setState({ isEditTask: false });
  }

  render() {
    const { username, email, text, image_path, status, isAdmin } = this.props;
    const { isEditTask } = this.state;
    console.log(status)

    return (
      <React.Fragment>
        {!isEditTask
          ? (
            <div className={status === 10 ? 'taskDone' : ''}>
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
              <p>
                {'Task status: '}
                {status}
              </p>
              <img src={image_path} alt="" />

              {isAdmin
                && (
                  <Button type="submit" onClick={this.handleOpenEditTask} color="primary">
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

// Task.propTypes = {
//   templateList: T.arrayOf(T.any).isRequired,
//   classes: T.objectOf(T.any).isRequired,
// };

export default Task;
