export default function (values) {
  const errors = {};

  const requiredFields = [
    'title',
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.title && values.title.length > 50) errors.title = 'Task title too long, max 50 letters';

  return errors;
}
