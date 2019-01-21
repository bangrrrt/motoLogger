import * as types from './types';
import {
  ASYNC_LOGIN_USER_SUCCESS,
  ASYNC_LOGIN_USER_REQUEST,
  ASYNC_FETCH_USER_DATA_REQUEST,
  ASYNC_FETCH_USER_DATA_SUCCESS,
  ASYNC_FETCH_USER_DATA_ERROR
} from '../../loginScreen/state/types';

const initialState = {
  /**
   * List of motorcycles user owns
   */
  motorcycles: [],
  /**
   * Error message from server
   */
  error: '',
  /**
   * True if the app is loading a resource
   */
  isLoading: false
};

// Create update log function that takes in an operation type, data, and an id
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ASYNC_LOGIN_USER_SUCCESS:
    case ASYNC_FETCH_USER_DATA_SUCCESS: {
      const { motorcycles } = action.response.data;
      return {
        ...state,
        motorcycles,
        isLoading: false
      };
    }
    case ASYNC_LOGIN_USER_REQUEST:
    case ASYNC_FETCH_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ASYNC_FETCH_USER_DATA_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case types.ASYNC_ADD_MOTORCYCLE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.ASYNC_ADD_MOTORCYCLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        motorcycles: [...action.motorcycle]
      };
    case types.ASYNC_ADD_MOTORCYCLE_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
