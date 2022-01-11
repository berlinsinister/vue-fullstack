import axios from 'axios';

const url = 'http://localhost:5000/api/v1/tasks';
// const url = 'api/v1/tasks';

const tasksAPICalls = {
  create: async function(data) {
    // await axios.post(url, data);

    const token = localStorage.getItem('token');
    await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  read: async function() {
    // const { data } = await axios.get(url);
    // return data;

    const token = localStorage.getItem('token');
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  readTask: async function(id) {
    // const result = await axios.get(`${url}/${id}`);
    // const res = await result.data;
    // return res;

    const token = localStorage.getItem('token');
    const { data } = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  update: async function(id, data) {
    // await axios.patch(`${url}/${id}`, data);
    const token = localStorage.getItem('token');
    await axios.patch(`${url}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: async function(id) {
    // await axios.delete(`${url}/${id}`);
    const token = localStorage.getItem('token');
    await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default tasksAPICalls;
