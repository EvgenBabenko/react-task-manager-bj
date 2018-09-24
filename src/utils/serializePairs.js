import fixedEncodeURIComponent from './fixedEncodeURIComponent';

export default (array, ...args) => array
  .concat(...args)
  .map((elem) => {
    if (typeof elem.key !== 'number') elem.key = fixedEncodeURIComponent(elem.key);
    if (typeof elem.value !== 'number') elem.value = fixedEncodeURIComponent(elem.value);

    return elem;
  })
  .reduce((acc, elem) => acc.concat(`${elem.key}=${elem.value}`), [])
  .join('&');
