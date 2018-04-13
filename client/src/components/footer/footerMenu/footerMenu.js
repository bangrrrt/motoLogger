import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import './footerMenu.css';

class FooterMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Init component off screen
      width: 1000
    };
  }

  componentDidMount() {
    this.getDeviceWidth();
  }

  getDeviceWidth = () => {
    this.setState({
      width: window.innerWidth
    });
  }

  render() {
    const {
      width
    } = this.state;

    return (
      <Motion
        style={{
          right: spring(this.props.isFooterMenuOpen ? 0 : width)
        }}
      >
        {({ right }) => {
          return (
            <div
              className="footer-menu-wrapper"
              style={{ right, display: right === width ? 'none' : 'initial' }}
            >
              <div className="footer-menu-logo-wrapper">
                <img
                  className="footer-menu-logo"
                  src="https://raw.githubusercontent.com/bangrrrt/motoLogger/master/client/src/images/motoLogger-logo.png"
                  alt="motoLogger logo"
                />
              </div>
              <div className="footer-menu-content">
                <div className="footer-menu-links-wrapper">
                  <ul className="footer-menu-links">
                    <li className="footer-menu-link">
                      <a href="https://www.linkedin.com/in/christian-bangert-17939b75/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </li>
                    <li className="footer-menu-link">
                      <a href="https://github.com/bangrrrt">Github</a>
                    </li>
                    <li className="footer-menu-link">
                      <a href="mailto:ChristianDBangert@gmail.com">ChristianDBangert@gmail.com</a>
                    </li>
                  </ul>
                  <img className="footer-menu-cb-logo" src="https://raw.githubusercontent.com/bangrrrt/motoLogger/master/client/src/images/cb-logo.png" alt="cb logo" />
                </div>
              </div>
              <span
                className="footer-menu-remove-icon glyphicon glyphicon-remove"
                onClick={() => this.props.onToggleFooterMenu()}
              />
            </div>
          );
        }}
      </Motion>
    );
  };
}

const { bool, func } = PropTypes;

FooterMenu.propTypes = {
  /**
   * An action that toggles the footer menu visible
   */
  onToggleFooterMenu: func.isRequired,
  /**
   * True if the footer menu is open
   */
  isFooterMenuOpen: bool.isRequired
};

export default FooterMenu;
