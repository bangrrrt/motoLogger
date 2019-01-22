import React, { Component } from 'react';
import classNames from 'classnames';
import { Image } from 'react-bootstrap';
import scrollIntoView from 'scroll-into-view';
import PropTypes from 'prop-types';

import Menu from './menu';

import './header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isInitRender: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isHeaderVisible !== this.props.isHeaderVisible && prevState.isInitRender) {
      this.handleUpdateInitRender();
    }
  }

  scrollToElement = (elementName) => {
    const element = document.getElementById(elementName);
    scrollIntoView(element, {
      time: 200
    });
    if (this.props.isMenuOpen) {
      this.props.onToggleMenu();
    }
  }

  handleUpdateInitRender = () => {
    this.setState({ isInitRender: false });
  }

  render() {
    const { isHeaderVisible, isMenuOpen } = this.props;
    const navBarClasses = classNames('hs-header-navbar', {
      'hs-header-navbar-init-render': this.state.isInitRender,
      'hs-header-navbar-animation--in': isHeaderVisible,
      'hs-header-navbar-animation--out': !isHeaderVisible && !this.state.isInitRender
    });

    return (
      <div>
        <div className={navBarClasses}>
          <button
            className="hs-header-brand"
            onClick={() => this.scrollToElement('login')}
          >
            <Image
              className="hs-header-logo"
              responsive
              src="https://raw.githubusercontent.com/bangrrrt/motoLogger/master/client/src/images/motoLogger-logo.png"
              alt="motoLogger"
            />
          </button>
          <div className="hs-header-nav">
            <div className="hs-header-link-item">
              <button
                onClick={() => this.scrollToElement('login')}
                className="hs-header-link hvr-underline-from-center"
              >
                Login
              </button>
            </div>
            <div className="hs-header-link-item">
              <button
                className="hs-header-link hvr-underline-from-center"
                onClick={() => this.scrollToElement('register')}
              >
                Register
              </button>
            </div>
          </div>
          <span
            role="button"
            onKeyPress={() => {}}
            tabIndex={0}
            className="hs-header-nav-mobile-menu-icon glyphicon glyphicon-menu-hamburger"
            onClick={(e) => {
              e.preventDefault();
              this.props.onToggleMenu();
            }}
          />
        </div>
        <Menu
          isMenuOpen={isMenuOpen}
          scrollToElement={this.scrollToElement}
        />
      </div>
    );
  }
}

const { func, bool } = PropTypes;

Header.propTypes = {
  /**
   * True when menu is open
   */
  isMenuOpen: bool.isRequired,
  /**
   * Action that opens and closes the mobile menu
   */
  onToggleMenu: func.isRequired
};

Header.defaultProps = {
};

export default Header;
