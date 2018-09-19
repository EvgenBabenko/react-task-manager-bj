import axios from 'axios';

import config from '../config';

axios.defaults.baseURL = config.APIHost;

export default () => axios.create({
  params: {
    developer: config.developer,
  },
});
