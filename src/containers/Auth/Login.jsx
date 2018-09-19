import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import T from 'prop-types';

import AuthForm from '../../components/Auth/AuthForm/AuthForm';
import { login } from '../../store/users/actions';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    // const { dispatch } = this.props;

    // dispatch(logout());

    // this.boundActionCreators = bindActionCreators({
    //   toggleLocalStorage,
    // }, dispatch);
    this.submit = this.submit.bind(this);
  }

  submit(values) {

    console.log(values)
    const { dispatch } = this.props;

    dispatch(login(values));
  }

  render() {
    return (
      <AuthForm
        onSubmit={this.submit}
        title="Login"
        titleButton="Login"
        {...this.props}
        {...this.boundActionCreators}
      />
    );
  }
}

const mapStateToProps = state => ({
  // isLocalStorage: state.user.tokenStorage.isLocalStorage,
  // notifyMessage: state.common.notifyMessage,
});

LoginContainer.propTypes = {
  dispatch: T.func.isRequired,
};

export default connect(mapStateToProps)(LoginContainer);
