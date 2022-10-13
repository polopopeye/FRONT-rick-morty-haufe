const constants = {
  baseApiUrl: process.env.REACT_APP_BASE_URL + '/',
  api: {
    character: process.env.REACT_APP_BASE_URL + '/character/',
    user: process.env.REACT_APP_BASE_URL + '/users/',
    favourite: process.env.REACT_APP_BASE_URL + '/favourite/',
  },
};

export default constants;
