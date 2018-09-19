import React, { Component } from 'react';
import { reset } from 'redux-form';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';

import Task from './Task/Task';
import AddTaskForm from './AddTaskForm/AddTaskForm';
import ModalTaskPreview from './ModalTaskPreview/ModalTaskPreview';
import Sorting from './Sorting/Sorting';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  pagination: {
    alignSelf: 'center',
  },
};

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTaskIsOpen: false,
    };

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleOpenPreviewTask = this.handleOpenPreviewTask.bind(this);
    this.handleClosePreviewTask = this.handleClosePreviewTask.bind(this);
    // this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChangePage(page) {
    const { changePage } = this.props;

    changePage(page);
  }

  // handleSubmitForm(values) {
  //   console.log('handleSubmitForm', values);
  // }

  handleAddTask() {
    const { addTask, dispatch, formStates } = this.props;

    console.log('handleAddTask', formStates);

    this.handleClosePreviewTask();

    // addTask(formStates);

    dispatch(reset('addTask'));
  }

  handleOpenPreviewTask() {
    const { formStates } = this.props;

    console.log('handleOpenPreviewTask', formStates);

    this.setState({ modalTaskIsOpen: true });
  }

  handleClosePreviewTask() {
    const { formStates } = this.props;

    console.log('handleClosePreviewTask', formStates);

    this.setState({ modalTaskIsOpen: false });
  }

  handleChangeSortBy(event) {
    const { changeSortField } = this.props;

    changeSortField(event.target.value);
  }

  render() {
    const {
      taskList, totalTaskCount, currentPage, classes, ...othersProps
    } = this.props;

    const { modalTaskIsOpen } = this.state;

    return (
      <React.Fragment>
        <AddTaskForm
          onSubmit={this.handleSubmitForm}
          handleOpenPreviewTask={this.handleOpenPreviewTask}
          handleClosePreviewTask={this.handleClosePreviewTask}
          handleAddTask={this.handleAddTask}
          {...othersProps}
        />

        {modalTaskIsOpen
          && (
            <ModalTaskPreview
              {...this.props}
              handleAddTask={this.handleAddTask}
              handleClosePreviewTask={this.handleClosePreviewTask}
            />
          )
        }

        <Sorting
          {...othersProps}
          handleChangeSortBy={this.handleChangeSortBy}
        />

        <div className={classes.root}>
          {taskList.length
            ? taskList.map(task => (
              <Task
                key={task.id}
                {...task}
                {...othersProps}
              />
            ))
            : <p>no items</p>
          }
        </div>

        <div className={classes.pagination}>
          <Pagination
            onChange={this.handleChangePage}
            current={currentPage}
            total={totalTaskCount}
            defaultPageSize={3}
            locale={localeInfo}
          />
        </div>

      </React.Fragment>
    );
  }
}

TaskList.propTypes = {
  taskList: T.arrayOf(T.any).isRequired,
  classes: T.objectOf(T.any).isRequired,
};

export default withStyles(styles)(TaskList);
