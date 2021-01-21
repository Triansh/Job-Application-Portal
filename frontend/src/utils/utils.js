import _ from 'lodash';

import { setStatus } from '../features/statusSlice';
import { setLogin, setRole } from '../features/userSlice';

export const sort = (items, term, order) => {
  //   console.log(items, term , order);
  return _.orderBy(items, term, order);
};

export const sendError = (dispatch, error) => {
  console.log(error);
  console.log(error.response.data);
  const { message } = error.response.data;
  dispatch(setStatus({ status: 'error', message: message || 'Oops! Something went wrong' }));
};

export const sendSuccess = (dispatch, message) => {
  console.log(message);
  dispatch(setStatus({ status: 'success', message: message || 'Success' }));
};

export const signOut = (dispatch) => {
  dispatch(setLogin({ isLoggedIn: false }));
  dispatch(setRole({ role: '' }));
  sendSuccess(dispatch, 'You have Logged out');
};

export const signIn = (dispatch, role, message) => {
  dispatch(setRole({ role }));
  dispatch(setLogin({ isLoggedIn: true }));
  sendSuccess(dispatch, message);
};
