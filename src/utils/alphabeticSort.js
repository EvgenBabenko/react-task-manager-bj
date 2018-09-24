export default formData => Object
  .keys(formData)
  .reduce((acc, key) => acc.concat({ key, value: formData[key] }), [])
  .sort((a, b) => a.key > b.key);
