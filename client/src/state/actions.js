import * as types from './types';

export const onToggleFooterMenu = () => ({
  type: types.ON_OPEN_FOOTER_MENU
});

export const isAppViewMobile = isMobile => ({
  type: types.UPDATE_MOBILE_STATE,
  isMobile
});
