import React from 'react';
import PropTypes from 'prop-types';

import FooterMenuContainer from './footerMenu/footerMenuContainer';
import FooterBar from './footerBar/footerBar';

import './footer.css';

const Footer = ({ isMobile }) => {
  if (isMobile) {
    return <FooterMenuContainer />;
  }

  return <FooterBar />;
};

const { bool } = PropTypes;

Footer.propTypes = {
  /**
   * If true the app is being viewed from a mobile device
   */
  isMobile: bool.isRequired
};

export default Footer;
