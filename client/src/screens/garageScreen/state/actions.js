import axios from 'axios';

import * as types from './types';

const asyncAddMotorcycleSuccess = motorcycle => ({
  type: types.ASYNC_ADD_MOTORCYCLE_SUCCESS,
  motorcycle
});

const asyncAddMotorcycleError = error => ({
  type: types.ASYNC_ADD_MOTORCYCLE_ERROR,
  error
});

const asyncAddMotorcycleRequest = () => ({
  type: types.ASYNC_ADD_MOTORCYCLE_REQUEST
});

export const asyncAddMotorcycle = dataToPost => (dispatch) => {
  dispatch(asyncAddMotorcycleRequest());

  return axios({
    method: 'POST',
    url: '/api/motorcycles/add',
    headers: { Authorization: window.localStorage.token },
    data: dataToPost
  })
    .then(res => dispatch(asyncAddMotorcycleSuccess(res.data)))
    .catch(err => dispatch(asyncAddMotorcycleError(err)));
};

const asyncUpdateMotorcycleSuccess = response => ({
  type: types.ASYNC_UPDATE_MOTORCYCLE_SUCCESS,
  response
});

const asyncUpdateMotorcycleError = error => ({
  type: types.ASYNC_UPDATE_MOTORCYCLE_ERROR,
  error
});

const asyncUpdateMotorcycleRequest = () => ({
  type: types.ASYNC_UPDATE_MOTORCYCLE_REQUEST
});

export const asyncUpdateMotorcycle = dataToPost => (dispatch) => {
  dispatch(asyncUpdateMotorcycleRequest());

  return axios.post('/api/motorcycles/update', dataToPost)
    .then(res => dispatch(asyncUpdateMotorcycleSuccess(res)))
    .catch(err => dispatch(asyncUpdateMotorcycleError(err)));
};
