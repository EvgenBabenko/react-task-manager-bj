import React, { Component } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { bindActionCreators } from 'redux';

import Login from '../components/Login/Login';
import { login } from '../store/users/actions';
import { clearNotifyMessage } from '../store/common/actions';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators({ clearNotifyMessage }, dispatch);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { dispatch } = this.props;

    dispatch(login(values));
  }

  render() {
    return (
      <Login
        onSubmit={this.submit}
        {...this.boundActionCreators}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  notifyMessage: state.common.notifyMessage,
});

LoginContainer.propTypes = {
  dispatch: T.func.isRequired,
};

export default connect(mapStateToProps)(LoginContainer);
