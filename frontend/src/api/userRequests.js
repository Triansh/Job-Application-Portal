import axios from 'axios';

const url = 'http://localhost:5000/api/users';

export const registerUser = (user) => axios.post(`${url}/register`, user);

export const loginUser = (user) => axios.post(`${url}/login`, user);

export const setHeaders = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log(axios.defaults.headers);
};

export const getUserData = () => axios.get(url);

export const updateUser = (user) => axios.patch(url, user);
