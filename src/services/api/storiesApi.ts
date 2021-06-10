import {API_URL} from '../../utils/constants';

import request from '../../config/api/request';

export default {
  getTopStories: async () => {
    return request(`${API_URL}/topstories.json`, 'GET');
  },
};
