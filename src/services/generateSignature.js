import md5 from 'md5';

import config from '../config';
import fixedEncodeURIComponent from '../utils/fixedEncodeURIComponent';

export default (gatheringFormData) => {
  const sortedFormData = Object
    .keys(gatheringFormData)
    .reduce((acc, key) => acc.concat({ key, value: gatheringFormData[key] }), [])
    .sort((a, b) => a.key > b.key);

  const paramsString = sortedFormData
    .slice()
    .concat({ key: 'token', value: config.token })
    .map((elem) => {
      if (typeof elem.key !== 'number') elem.key = fixedEncodeURIComponent(elem.key);
      if (typeof elem.value !== 'number') elem.value = fixedEncodeURIComponent(elem.value);
      // elem.key = fixedEncodeURIComponent(elem.key);
      // elem.value = fixedEncodeURIComponent(elem.value);

      return elem;
    })
    .reduce((acc, elem) => acc.concat(`${elem.key}=${elem.value}`), [])
    .join('&');

  return md5(paramsString);
};
