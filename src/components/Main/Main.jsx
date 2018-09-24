import React, { Component } from 'react';
import { reset } from 'redux-form';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';

import AddTaskForm from './AddTaskForm/AddTaskForm';
import Sorting from './Sorting/Sorting';
import TaskList from './TaskList/TaskList';
import ModalTaskPreview from './ModalTaskPreview/ModalTaskPreview';
import NoItems from '../NoItems/NoItems';

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

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTaskIsOpen: false,
    };

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleChangeSortByField = this.handleChangeSortByField.bind(this);
    this.handleChangeSortDirection = this.handleChangeSortDirection.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleOpenPreviewTask = this.handleOpenPreviewTask.bind(this);
    this.handleClosePreviewTask = this.handleClosePreviewTask.bind(this);
  }

  handleAddTask() {
    const { addTask, dispatch, formStates } = this.props;

    this.handleClosePreviewTask();

    addTask(formStates);

    dispatch(reset('addTask'));
  }

  handleOpenPreviewTask() {
    this.setState({ modalTaskIsOpen: true });
  }

  handleClosePreviewTask() {
    this.setState({ modalTaskIsOpen: false });
  }

  handleChangeSortByField(event) {
    const { changeSortField } = this.props;

    changeSortField(event.target.value);
  }

  handleChangeSortDirection(event) {
    const { changeSortDirection } = this.props;

    changeSortDirection(event.target.value);
  }

  handleChangePage(page) {
    const { changePage } = this.props;

    changePage(page);
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
              {...othersProps}
              handleAddTask={this.handleAddTask}
              handleClosePreviewTask={this.handleClosePreviewTask}
            />
          )
        }

        {taskList.length
          ? (
            <React.Fragment>
              <Sorting
                {...othersProps}
                handleChangeSortByField={this.handleChangeSortByField}
                handleChangeSortDirection={this.handleChangeSortDirection}
              />

              <TaskList {...{ ...othersProps, taskList }} />

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
          )
          : <NoItems />
        }
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  taskList: T.arrayOf(T.any).isRequired,
  classes: T.objectOf(T.any).isRequired,
};

export default withStyles(styles)(Main);
