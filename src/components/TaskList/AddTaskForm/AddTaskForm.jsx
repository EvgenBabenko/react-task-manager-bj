import React from 'react';
import { Field, reduxForm } from 'redux-form';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';

import validate from './validate';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-start',
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

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};

const AddTaskForm = (props) => {
  const {
    handleSubmit, pristine, submitting, classes, handleAddTask, handleOpenPreviewTask
  } = props;

  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Field name="username" component={renderTextField} label="User name" fullWidth />
        <Field name="email" component={renderTextField} label="Email" fullWidth />
        <Field name="text" component={renderTextField} label="Task description" multiLine rows={2} fullWidth />
        <Field name="image" component={FileInput} type="file" accept="image/*" />
        <Button onClick={handleAddTask} color="primary" disabled={pristine || submitting} className={classes.button}>
          Add a task
        </Button>
        <Button onClick={handleOpenPreviewTask} color="primary" disabled={pristine || submitting} className={classes.button}>
          Preview mode
        </Button>
      </form>
    </MuiThemeProvider>
  );
};

AddTaskForm.propTypes = {
  handleSubmit: T.func.isRequired,
  pristine: T.bool.isRequired,
  submitting: T.bool.isRequired,
  classes: T.objectOf(T.any).isRequired,
};

renderTextField.propTypes = {
  input: T.objectOf(T.any).isRequired,
  label: T.string.isRequired,
  meta: T.objectOf(T.any).isRequired,
};

const AddTaskFormWrapper = reduxForm({
  form: 'addTask',
  validate,
})(AddTaskForm);

export default withStyles(styles)(AddTaskFormWrapper);
