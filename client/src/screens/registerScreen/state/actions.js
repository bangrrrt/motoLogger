import axios from 'axios';

import * as types from './types';

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

const asyncRegisterUser = (userData, token) => (dispatch) => {
  dispatch(asyncRegisterUserRequest());

  return axios.post('/api/register/', { userData, token })
    .then(res => dispatch(asyncRegisterUserSuccess(res)))
    .catch(error => dispatch(asyncRegisterUserError(error.response.data)));
};

export default asyncRegisterUser;
