import * as types from './types';

const initialState = {
  /**
   * True if the footer menu is open
   */
  isFooterMenuOpen: false,
  /**
   * True if the app is being viewed on a mobile device
   */
  isMobile: false,
  /**
   * The width of the device viewing the app
   */
  deviceWidth: 0,
  /**
   * The height of the device viewing the app
   */
  deviceHeight: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_MOBILE_STATE: {
      return {
        ...state,
        isMobile: action.isMobile
      };
    }
    case types.ON_OPEN_FOOTER_MENU: {
      return {
        ...state,
        isFooterMenuOpen: !state.isFooterMenuOpen
      }
    }
    default:
      return state;
  }
};

export default reducer;
