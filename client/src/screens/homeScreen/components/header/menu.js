import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Footer from '../footer/footer';

import './menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitRender: true
    };
  }

  componentDidUpdate(prevProps) {
    const bodyNode = document.getElementsByTagName('body')[0];
    if (this.state.isInitRender && (this.props.isMenuOpen !== prevProps.isMenuOpen)) {
      this.handleInitRender();
    }

    if (this.props.isMenuOpen) {
      bodyNode.style.overflow = 'hidden';
    } else {
      bodyNode.style.overflow = 'initial';
    }
  }

  handleInitRender = () => {
    this.setState({ isInitRender: false });
  }

  render() {
    const {
      isMenuOpen,
      scrollToElement
    } = this.props;

    const menuClasses = classNames('hs-header-menu-wrapper', {
      'hs-header-menu--in': isMenuOpen,
      'hs-header-menu--out': !isMenuOpen,
      'hs-header-menu--init-render': this.state.isInitRender
    });

    //  Create reusable footer component
    return (
      <div className={menuClasses}>
        <div>
          <h1 className="hs-header-menu-slogan">Fix It, Log It</h1>
          <ul className="hs-header-menu-list">
            <li className="hs-header-menu-nav-item">
              <button
                className="hs-header-menu-button"
                onClick={() => scrollToElement('login')}
              >
                Login
              </button>
            </li>
            <li className="hs-header-menu-nav-item">
              <button
                id="hs-header-menu-button-register"
                className="hs-header-menu-button"
                onClick={() => scrollToElement('register')}
              >
                Register
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="hs-header-menu-contact">Contact Me</h2>
          <Footer />
        </div>
      </div>
    );
  }
}

const { bool, func } = PropTypes;

Menu.propTypes = {
  /**
   * True when menu is open
   */
  isMenuOpen: bool.isRequired,
  /**
   * Element to scroll to
   */
  scrollToElement: func.isRequired
};

Menu.defaultProps = {
};

export default Menu;
