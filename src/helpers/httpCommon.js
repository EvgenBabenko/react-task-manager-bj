import axios from 'axios';

import config from '../config';
// import requestHeader from './requestHeader';

axios.defaults.baseURL = config.APIHost;

export default () => axios.create({
  params: {
    developer: config.developer,
  },
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
// export default axios;
