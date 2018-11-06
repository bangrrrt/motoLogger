import moment from 'moment';
import axios from 'axios';

import * as types from './types';

const crypto = require('crypto');

const cryptoString = (len) => {
  if (!Number.isFinite(len)) {
    throw new TypeError('Expected a finite number');
  }

  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
};

export const createLog = () => {
  const newLog = {
    logId: cryptoString(24),
    logName: '',
    dateAdded: moment().format('MMM D, YYYY'),
    notes: '',
    isEditable: true,
    parts: [],
    miles: 0
  };

  return {
    type: types.CREATE_LOG,
    newLog
  };
};

export const onSelectLogPart = logId => ({
  type: types.SELECT_LOG_PART,
  logId
});

export const onUpdateDate = (date, logId) => ({
  type: types.UPDATE_LOG_DATE,
  date,
  logId
});

export const onAddLogMiles = (miles, logId) => ({
  type: types.ADD_LOG_MILES,
  miles,
  logId
});

export const onDeleteLogParts = (partsIndex, logId) => ({
  type: types.DELETE_LOG_PART,
  partsIndex,
  logId
});

export const onAddLogPart = (part, logId) => ({
  type: types.ADD_LOG_PART,
  part,
  logId
});

export const onEditLog = editingLogId => ({
  type: types.EDIT_LOG,
  editingLogId
});

export const onToggleMenu = logId => ({
  type: types.TOGGLE_MENU,
  logId
});

/**
 * Async Actions
 */
const asyncFetchLogsRequest = () => ({
  type: types.ASYNC_FETCH_LOGS_REQUEST
});

const asyncFetchLogsError = error => ({
  type: types.ASYNC_FETCH_LOGS_ERROR,
  error
});

const asyncFetchLogsSuccess = data => ({
  type: types.ASYNC_FETCH_LOGS_SUCCESS,
  data
});

export const asyncFetchLogs = motorcycleId => (dispatch) => {
  dispatch(asyncFetchLogsRequest());

  return axios.get('/api/logs/list', { headers: { Authorization: window.localStorage.token }, data: { motorcycleId } })
    .then(res => dispatch(asyncFetchLogsSuccess(res.data)))
    .catch(err => dispatch(asyncFetchLogsError(err)));
};


const asyncCreateLogRequest = () => ({
  type: types.ASYNC_CREATE_LOG_REQUEST
});

const asyncCreateLogError = error => ({
  type: types.ASYNC_CREATE_LOG_ERROR,
  error
});

const asyncCreateLogSuccess = logId => ({
  type: types.ASYNC_CREATE_LOG_SUCCESS,
  logId
});

export const asyncCreateLog = newItem => (dispatch) => {
  dispatch(asyncCreateLogRequest());

  return axios.put('/api/logs/createLog', newItem)
    .then(() => dispatch(asyncCreateLogSuccess(newItem.logId)))
    .catch(err => dispatch(asyncCreateLogError(err)));
};

const asyncDeleteLogRequest = () => ({
  type: types.ASYNC_DELETE_LOG_REQUEST
});

const asyncDeleteLogError = error => ({
  type: types.ASYNC_DELETE_LOG_ERROR,
  error
});

const asyncDeleteLogSuccess = logId => ({
  type: types.ASYNC_DELETE_LOG_SUCCESS,
  logId
});

export const asyncDeleteLog = logId => (dispatch) => {
  dispatch(asyncDeleteLogRequest());

  return axios.delete(`/api/logs/deleteLog/${logId}`)
    .then(() => dispatch(asyncDeleteLogSuccess(logId)))
    .catch(err => dispatch(asyncDeleteLogError(err)));
};

const asyncUpdateLogsRequest = () => ({
  type: types.ASYNC_UPDATE_LOGS_REQUEST
});

const asyncUpdateLogsError = error => ({
  type: types.ASYNC_UPDATE_LOGS_ERROR,
  error
});

const asyncUpdateLogsSuccess = editingLogId => ({
  type: types.ASYNC_UPDATE_LOGS_SUCCESS,
  editingLogId
});

export const asyncUpdateLogs = editingLog => (dispatch) => {
  dispatch(asyncUpdateLogsRequest());
  return axios.put('/api/logs/updateLog', editingLog)
    .then(res => dispatch(asyncUpdateLogsSuccess(res.data)))
    .catch(error => dispatch(asyncUpdateLogsError(error)));
};
