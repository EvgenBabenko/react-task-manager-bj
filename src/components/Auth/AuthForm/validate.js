export default function (values) {
  const errors = {};

  const requiredFields = [
    'userLogin',
    'userPassword',
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';

  // if (values.password && values.password.length <= 4) errors.password = 'Password too short, should be more than 4 letters';

  return errors;
}
