import * as types from './types';

export const toggleMobileHomeScreenMenu = () => ({
  type: types.TOGGLE_HOME_SCREEN_MOBILE_MENU
});

export const toggleHeaderVisibility = isHeaderVisible => ({
  type: types.TOGGLE_HEADER_VISIBILITY,
  isHeaderVisible
});
