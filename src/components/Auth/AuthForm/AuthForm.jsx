import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import T from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import validate from './validate';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'flex-start',
  },
  form: {
    width: '350px',
  },
  button: {
    marginTop: '20px',
  },
};

const renderTextField = ({
  input, label, meta: { touched, error }, ...custom
}) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

const AuthForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    titleButton,
    titleRedirect,
    title,
    classes,
    actionRedirect,
    titleRedirectButton,
    toggleLocalStorage,
    isLocalStorage,
  } = props;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <h2>
          {title}
        </h2>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <form onSubmit={handleSubmit} className={classNames(classes.root, classes.form)}>
            <Field name="userLogin" component={renderTextField} label="Login" fullWidth />
            <Field name="userPassword" component={renderTextField} label="Password" type="password" fullWidth />
            <Button fullWidth color="primary" type="submit" variant="contained" disabled={pristine || submitting} className={classes.button}>
              {titleButton}
            </Button>
          </form>
        </MuiThemeProvider>
      </div>
    </React.Fragment>
  );
};

AuthForm.propTypes = {
  handleSubmit: T.func.isRequired,
  toggleLocalStorage: T.func.isRequired,
  pristine: T.bool.isRequired,
  submitting: T.bool.isRequired,
  isLocalStorage: T.bool.isRequired,
  classes: T.objectOf(T.any).isRequired,
  titleButton: T.string.isRequired,
  titleRedirect: T.string.isRequired,
  title: T.string.isRequired,
  actionRedirect: T.string.isRequired,
  titleRedirectButton: T.string.isRequired,
};

renderTextField.propTypes = {
  input: T.objectOf(T.any).isRequired,
  label: T.string.isRequired,
  meta: T.objectOf(T.any).isRequired,
};

const AuthFormWrapper = reduxForm({
  form: 'auth',
  validate,
})(AuthForm);

export default withStyles(styles)(AuthFormWrapper);
