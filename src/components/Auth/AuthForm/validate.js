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

  return errors;
}
