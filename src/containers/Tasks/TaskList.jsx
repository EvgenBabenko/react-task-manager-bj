import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import T from 'prop-types';

import TaskList from '../../components/TaskList/TaskList';
import Loading from '../../components/Loading/Loading';
import { getTaskList, addTask, changeSortField, changePage, updateTask } from '../../store/tasks/actions';

class TaskListContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators({ addTask, changeSortField, changePage, updateTask }, dispatch);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getTaskList());
  }

  render() {
    const { isRequest } = this.props;

    return (
      <React.Fragment>
        {!isRequest
          ? <TaskList {...this.props} {...this.boundActionCreators} />
          : <Loading />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isRequest: state.tasks.isRequest,
  taskList: state.tasks.taskList,
  sortBy: state.tasks.sortBy,
  currentPage: state.tasks.currentPage,
  totalTaskCount: state.tasks.totalTaskCount,
  isAdmin: state.users.isAdmin,
});

TaskListContainer.propTypes = {
  dispatch: T.func.isRequired,
  taskList: T.arrayOf(T.any).isRequired,
};

export default connect(mapStateToProps)(TaskListContainer);
