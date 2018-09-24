import axios from 'axios';

import config from '../config';

axios.defaults.baseURL = config.APIHost;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

const instance = axios.create({
  params: {
    developer: config.developer,
  },
});

export default instance;
