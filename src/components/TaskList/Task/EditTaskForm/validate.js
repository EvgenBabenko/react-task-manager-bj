export default function (values) {
  const errors = {};

  const requiredFields = [
    'text',
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
}
