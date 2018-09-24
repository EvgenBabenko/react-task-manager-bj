import md5 from 'md5';

import config from '../config';
import serializePairs from '../utils/serializePairs';
import alphabeticSort from '../utils/alphabeticSort';

export default (gatheringFormData) => {
  const sortedFormData = alphabeticSort(gatheringFormData);

  const paramsString = serializePairs(sortedFormData, { key: 'token', value: config.token });

  return md5(paramsString);
};
