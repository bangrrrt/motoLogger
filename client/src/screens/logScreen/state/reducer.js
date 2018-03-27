import map from 'lodash/map';
import moment from 'moment';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import indexOf from 'lodash/indexOf';

import * as types from './types';
import { updateLogEditingStatus } from './helper';

const initialState = {
  // True if the app is making a request to the server
  isLoading: false,
  // Id of the log menu that is open
  activeMenuLogId: [],
  // Array of logs
  logItems: []
};

// Create update log function that takes in an operation type, data, and an id
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOG_DATE:
      return {
        ...state,
        logItems: map(state.logItems, (logItem) => {
          if (logItem.logId === action.logId) {
            return {
              ...logItem,
              dateAdded: moment(action.date).format('MMM D, YYYY')
            };
          }

          return logItem;
        })
      };
    case types.ADD_LOG_MILES:
      return {
        ...state,
        logItems: map(state.logItems, (logItem) => {
          if (logItem.logId === action.logId) {
            return {
              ...logItem,
              miles: action.miles
            };
          }

          return logItem;
        })
      };
    case types.ASYNC_FETCH_LOGS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.ASYNC_FETCH_LOGS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case types.ASYNC_FETCH_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        logItems: [
          ...state.logItems,
          ...action.fetchedLogs
        ]
      };
    case types.ASYNC_UPDATE_LOGS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.ASYNC_UPDATE_LOGS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case types.ASYNC_UPDATE_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activeMenuLogId: [],
        logItems: map(state.logItems, (log) => {
          if (log.logId !== action.editingLogId.logId) {
            return log;
          }
          // Return updated log if ids match
          return action.editingLogId;
        })
      };
    case types.ASYNC_CREATE_LOG_REQUEST:
      return {
        ...state,
        activeMenuLogId: [],
        isLoading: true
      };
    case types.ASYNC_CREATE_LOG_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case types.ASYNC_CREATE_LOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activeMenuLogId: [],
        logItems: [
          action.newItem,
          ...state.logItems
        ]
      };
    case types.ASYNC_DELETE_LOG_REQUEST:
      return {
        ...state,
        activeMenuLogId: [],
        parts: [],
        isLoading: true
      };
    case types.ASYNC_DELETE_LOG_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case types.ASYNC_DELETE_LOG_SUCCESS:
      return {
        ...state,
        logItems: state.logItems.filter(element => element.logId !== action.logId)
      };
    case types.EDIT_LOG:
      return {
        ...state,
        activeMenuLogId: [],
        logItems: updateLogEditingStatus(action.editingLogId, state.logItems)
      };
    case types.TOGGLE_MENU:
      return {
        ...state,
        activeMenuLogId: includes(state.activeMenuLogId, action.logId) ? [] : [action.logId]
      };
    case types.ADD_LOG_PART: {
      const logItems = map(state.logItems, (log) => {
        if (log.logId === action.logId) {
          return {
            ...log,
            parts: [
              ...log.parts,
              action.part
            ]
          };
        }

        return log;
      });

      return {
        ...state,
        logItems
      };
    }
    case types.DELETE_LOG_PART: {
      const logItems = map(state.logItems, (log) => {
        // Find log that is being edited
        if (log.logId === action.logId) {
          // Remove selected parts
          return {
            ...log,
            parts: filter(log.parts, (part) => {
              // If the index of the part is found in the partsIndex array, remove part
              return !includes(action.partsIndex, indexOf(log.parts, part));
            })
          };
        }
        return log;
      });

      return {
        ...state,
        logItems
      };
    }
    default:
      return state;
  }
};

export default reducer;
