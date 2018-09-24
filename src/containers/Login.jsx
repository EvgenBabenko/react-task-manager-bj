import React, { Component } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';

import Login from '../components/Login/Login';
import { login } from '../store/users/actions';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

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
        {...this.props}
      />
    );
  }
}

LoginContainer.propTypes = {
  dispatch: T.func.isRequired,
};

export default connect(null)(LoginContainer);
