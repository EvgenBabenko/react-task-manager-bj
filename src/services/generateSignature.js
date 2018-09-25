import md5 from 'md5';

import serializePairs from '../utils/serializePairs';
import alphabeticSort from '../utils/alphabeticSort';

export default (gatheringFormData, ...args) => {
  const sortedFormData = alphabeticSort(gatheringFormData);

  const paramsString = serializePairs(sortedFormData, ...args);

  return md5(paramsString);
};
