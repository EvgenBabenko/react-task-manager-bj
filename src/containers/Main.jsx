import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import T from 'prop-types';
import { getFormValues } from 'redux-form';

import Main from '../components/Main/Main';
import Loading from '../components/Loading/Loading';
import {
  getTaskList,
  addTask,
  changeSortField,
  changePage,
  updateTask,
  changeSortDirection,
} from '../store/tasks/actions';

class TaskListContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators({
      addTask, changeSortField, changeSortDirection, changePage, updateTask,
    }, dispatch);
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
          ? <Main {...this.props} {...this.boundActionCreators} />
          : <Loading />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isRequest: state.tasks.isRequest,
  taskList: state.tasks.taskList,
  sortByField: state.tasks.sortByField,
  sortDirection: state.tasks.sortDirection,
  currentPage: state.tasks.currentPage,
  totalTaskCount: state.tasks.totalTaskCount,
  isAdmin: state.users.isAdmin,
  formStates: getFormValues('addTask')(state),
});

TaskListContainer.propTypes = {
  dispatch: T.func.isRequired,
  taskList: T.arrayOf(T.any).isRequired,
};

export default connect(mapStateToProps)(TaskListContainer);
