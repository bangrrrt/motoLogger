import * as types from './types';

const initialState = {
  /**
   * True if the mobile home screen menu is open
   */
  isMenuOpen: false,
  /**
   * The slideIndex the user is viewing
   */
  slideIndex: 0,
  /**
   * True if the header for the home screen should be visible
   */
  isHeaderVisible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_HOME_SCREEN_MOBILE_MENU: {
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    }
    case types.TOGGLE_HEADER_VISIBILITY: {
      return {
        ...state,
        isHeaderVisible: action.isHeaderVisible
      };
    }
    default:
      return state;
  }
};

export default reducer;
