import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import './navBar.css';

class NavBar extends Component {
  componentDidMount() {
    this.isMobile();
    window.addEventListener('resize', debounce(this.isMobile, 250));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.isMobile, 250));
  }

  isMobile = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width <= 480 || (width <= 818 && height <= 480)) {
      // Detect portrait view on mobile
      this.props.onAppViewMobile(true);
    } else {
      this.props.onAppViewMobile(false);
    }
  }

  render() {
    const {
      activeMenuLogId,
      onAsyncCreateLog,
      isMobile
    } = this.props;

    return (
      <div className="nav-bar" style={{ bottom: isMobile ? '0' : 'initial  ' }}>
        <div className="nav-bar-menu">
          {isMobile && <span
            className="nav-bar-menu-icon glyphicon glyphicon-menu-hamburger"
            onClick={() => this.props.onToggleFooterMenu()}
            />}
        </div>
        <div className="nav-bar-title-wrapper">
          <h1 className="nav-bar-title">motoLogger</h1>
        </div>
        <div className="nav-bar-add-log">
          <span
            className="nav-bar-add-log-icon glyphicon glyphicon-plus-sign"
            disabled={activeMenuLogId}
            onClick={() => {
              onAsyncCreateLog();
            }}
          />
        </div>
      </div>
    );
  }
}

const { array, func, bool } = PropTypes;

NavBar.propTypes = {
  /**
   * Action to update the state of the app if viewed on mobile
   */
  onAppViewMobile: func.isRequired,
  /**
   * True if the app is being viewed on a mobile device
   */
  isMobile: bool.isRequired,
  /**
   * True if the log is in editing mode
   */
  activeMenuLogId: array.isRequired,
  /**
   * Action that creates a new log
   */
  onAsyncCreateLog: func.isRequired,
  /**
   * An action that toggles the footer menu visible
   */
  onToggleFooterMenu: func.isRequired
};

NavBar.defaultProps = {
};

export default NavBar;
