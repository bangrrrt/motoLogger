import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import GarageScreenContainer from '../garageScreen';

import NavBarContainer from '../../components/navBar/navBarContainer';
import LogListContainer from './components/logList/logListContainer';
import FooterContainer from '../../components/footer/footerContainer';

import './logScreen.css';

// Renders the log screen where all the logs are visible
class LogScreen extends Component {
  render() {
    const {
      logItems,
      isMobile
    } = this.props;

    return (
      <div>
        <NavBarContainer />
        <GarageScreenContainer />
        <Grid
          className="log-screen"
          style={{ width: isMobile ? '100%' : '' }}
        >
          <Row>
            <Col xs={12}>
              <LogListContainer logs={logItems} id="logId" />
            </Col>
          </Row>
        </Grid>
        <FooterContainer />
      </div>
    );
  }
}

const {
  array,
  bool,
  oneOfType,
  string,
  number
} = PropTypes;

LogScreen.propTypes = {
  /**
   * True if the user has just logged in
   */
  hasLoggedIn: bool.isRequired,
  /**
   * If true the app is being viewed from a mobile device
   */
  isMobile: bool.isRequired,
  /**
   * Array of list items
   */
  logItems: array.isRequired,
  /**
   * True if the screen is in editing mode
   */
  activeMenuLogId: array.isRequired,
  /**
   * Error returned from the server
   */
  error: oneOfType([string, number])
};

LogScreen.defaultProps = {
  activeMenuLogId: [],
  error: {}
};

export default LogScreen;
