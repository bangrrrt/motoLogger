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

export const asyncLoginUser = () => (dispatch) => {
  dispatch(asyncLoginUserRequest());
  return axios.get('/api/login/')
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

const asyncRegisterUserSuccess = response => ({
  type: types.ASYNC_REGISTER_USER_SUCCESS,
  response
});

const asyncRegisterUserError = error => ({
  type: types.ASYNC_REGISTER_USER_ERROR,
  error
});

const asyncRegisterUserRequest = () => ({
  type: types.ASYNC_REGISTER_USER_REQUEST
});

export const asyncRegisterUser = () => (dispatch) => {
  dispatch(asyncRegisterUserRequest());

  return axios.post('/register')
    .then(res => dispatch(asyncRegisterUserSuccess(res)))
    .catch(err => dispatch(asyncRegisterUserError(err)));
};
