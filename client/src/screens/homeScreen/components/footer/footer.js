import React from 'react';

import './footer.css';

const Footer = () => {
  const date = new Date();
  const copyright = `motoLogger Copyright ${date.getFullYear()}`;

  return (
    <div className="hs-footer-wrapper">
      <ul className="hs-footer-list">
        <li className="hs-footer-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="hs-footer-list-item-link"
            href="https://www.linkedin.com/in/bangrrrt"
          >
            Linked In
          </a>
        </li>
        <li className="hs-footer-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="hs-footer-list-item-link"
            href="https://www.github.com/"
          >
            Github
          </a>
        </li>
        <li className="hs-footer-item">
          <a
            className="hs-footer-list-item-link"
            href="mailto:ChristianDBangert@gmail.com"
          >
            ChristianDBangert@gmail.com
          </a>
        </li>
      </ul>
      <span className="hs-footer-copyright">{copyright}</span>
    </div>
  );
};

export default Footer;
