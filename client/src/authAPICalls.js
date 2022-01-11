import axios from 'axios';

const url = 'http://localhost:5000/api/v1/auth/login';
// const url = 'api/v1/auth/login';

const authAPICalls = {
  login: async function(userLoginData) {
    const { data } = await axios.post(url, userLoginData);
    return data;
  },
};

export default authAPICalls;
