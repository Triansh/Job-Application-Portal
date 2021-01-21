import React from 'react';
import { useDispatch } from 'react-redux';

import _ from 'lodash';
import { setStatus } from '../features/statusSlice';
import { setLogin } from '../features/userSlice';

export const sort = (items, term, order) => {
  //   console.log(items);
  //   console.log(term)
  //   console.log(order)
  return _.orderBy(items, term, order);
};

export const sendError = (dispatch, error) => {
  console.log(error);
  console.log(error.response.data);
  const { message } = error.response.data;
  dispatch(setStatus({ status: 'error', message }));
};

export const logout = (dispatch, isLogin) => {
  dispatch(setLogin({ isLogin }));
};
