import * as types from './types';

const initialState = {
  // True if the app is making a request to the server
  isLoading: false,
  // Error message returned from the server
  error: '',
  // True if the user was successfully created
  isUserCreated: false
};

// Create update log function that takes in an operation type, data, and an id
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ASYNC_REGISTER_USER_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case types.ASYNC_REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUserCreated: true
      };
    case types.ASYNC_REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default reducer;
