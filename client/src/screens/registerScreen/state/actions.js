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

const asyncRegisterUser = registerData => (dispatch) => {
  dispatch(asyncRegisterUserRequest());

  return axios.post('/api/register/', registerData)
    .then(res => dispatch(asyncRegisterUserSuccess(res)))
    .catch(error => dispatch(asyncRegisterUserError(error.response.data)));
};

export default asyncRegisterUser;
