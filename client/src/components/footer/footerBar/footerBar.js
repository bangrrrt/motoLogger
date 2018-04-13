import React from 'react';

import './footerBar.css';

const FooterBar = () => (
  <div className="footer-bar-content">
    <div className="footer-bar-links-wrapper">
      <ul className="footer-bar-links">
        <li className="footer-bar-link">
          <a href="https://www.linkedin.com/in/christian-bangert-17939b75/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li className="footer-bar-link">
          <a href="https://github.com/bangrrrt">Github</a>
        </li>
        <li className="footer-bar-link">
          <a href="mailto:ChristianDBangert@gmail.com">ChristianDBangert@gmail.com</a>
        </li>
      </ul>
      <img className="footer-bar-cb-logo" src="https://raw.githubusercontent.com/bangrrrt/motoLogger/master/client/src/images/cb-logo.png" alt="cb logo" />
    </div>
  </div>
);

export default FooterBar;
