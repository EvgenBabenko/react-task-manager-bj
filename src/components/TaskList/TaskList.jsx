import React, { Component } from 'react';
import { reset } from 'redux-form';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';

import Task from './Task/Task';
import AddTaskForm from './AddTaskForm/AddTaskForm';
// import Loading from '../Loading/Loading';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
};

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTaskForm: null,
    };

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handlePreviewTask = this.handlePreviewTask.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChangePage(page) {
    console.log(page)

    const { changePage, dispatch } = this.props;

    changePage(page);
  }

  handleSubmitForm(values) {
    console.log(values, 1);

    this.setState({ addTaskForm: values });
  }

  handleAddTask(values) {
    // const values = this.state.addTaskForm;

    const { addTask, dispatch } = this.props;

    console.log(values, 2);

    addTask(values);

    dispatch(reset('addtask'));
  }

  handlePreviewTask() {
    const values = this.state.addTaskForm;
    const { addTask, dispatch } = this.props;

    console.log(values, 3);

    // addTask(values);

    // dispatch(reset('addtask'));
  }

  handleChangeSortBy(event) {
    console.log(event.target.value)
    const { changeSortField } = this.props;

    changeSortField(event.target.value);
  }

  render() {
    const {
      taskList, totalTaskCount, currentPage, sortBy, classes, ...othersProps
    } = this.props;

    const mapStatuses = [
      'username',
      'email',
      'status',
    ];

    return (
      <React.Fragment>
        <AddTaskForm onSubmit={this.handleAddTask} handlePreviewTask={this.handlePreviewTask} handleAddTask={this.handleAddTask} {...othersProps} />

        <div>
          {'Sort by '}
          <form autoComplete="off">
            <FormControl>
              <InputLabel>
                field
              </InputLabel>
              <Select
                value={sortBy}
                onChange={this.handleChangeSortBy}
              >
                {mapStatuses.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </div>


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

        <Pagination
          onChange={this.handleChangePage}
          current={currentPage}
          total={totalTaskCount}
          defaultPageSize={3}
          locale={localeInfo}
        />
      </React.Fragment>
    );
  }
}

TaskList.propTypes = {
  taskList: T.arrayOf(T.any).isRequired,
  classes: T.objectOf(T.any).isRequired,
};

export default withStyles(styles)(TaskList);
