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
  return axios.post('/api/login/', credentials)
    .then(res => dispatch(asyncLoginUserSuccess(res)))
    .catch(error => dispatch(asyncLoginUserError(error.response.data)));
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
    .catch(res => dispatch(asyncLogOutUserError(res.data)));
};

const asyncFetchUserDataSuccess = response => ({
  type: types.ASYNC_FETCH_USER_DATA_SUCCESS,
  response
});

const asyncFetchUserDataError = error => ({
  type: types.ASYNC_FETCH_USER_DATA_ERROR,
  error
});

const asyncFetchUserDataRequest = () => ({
  type: types.ASYNC_FETCH_USER_DATA_REQUEST
});

export const asyncFetchUserData = () => (dispatch) => {
  dispatch(asyncFetchUserDataRequest());

  return axios.get('/api/login/user', { headers: { Authorization: window.localStorage.token } })
    .then(user => dispatch(asyncFetchUserDataSuccess(user)))
    .catch(response => dispatch(asyncFetchUserDataError(response.data)));
};
