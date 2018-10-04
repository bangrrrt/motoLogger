import axios from 'axios';

import * as types from './types';

const asyncLoginUserSuccess = response => ({
  type: types.ASYNC_LOGIN_USER_SUCCESS,
  response
});

const asyncLoginUserError = error => ({
  type: types.ASYNC_LOGIN_USER_ERROR,
  error
});

const asyncLoginUserRequest = () => ({
  type: types.ASYNC_LOGIN_USER_REQUEST
});

export const asyncLoginUser = credentials => (dispatch) => {
  dispatch(asyncLoginUserRequest());
  return axios.post('/api/signup/', credentials)
    .then(res => dispatch(asyncLoginUserSuccess(res)))
    .catch(err => dispatch(asyncLoginUserError(err)));
};

const asyncLogOutUserSuccess = response => ({
  type: types.ASYNC_LOGOUT_USER_SUCCESS,
  response
});

const asyncLogOutUserError = error => ({
  type: types.ASYNC_LOGOUT_USER_ERROR,
  error
});

const asyncLogOutUserRequest = () => ({
  type: types.ASYNC_LOGOUT_USER_REQUEST
});

export const asyncLogOutUser = () => (dispatch) => {
  dispatch(asyncLogOutUserRequest());
  return axios.get('/logout')
    .then(res => dispatch(asyncLogOutUserSuccess(res)))
    .catch(err => dispatch(asyncLogOutUserError(err)));
};
