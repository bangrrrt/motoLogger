import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import GarageScreenContainer from '../garageScreen';

import LogListContainer from './components/logList/logListContainer';

import './logScreen.css';

// Renders the log screen where all the logs are visible
class LogScreen extends Component {
  componentDidMount() {
    const {
      hasLoggedIn,
      onAsyncFetchUserData
    } = this.props;
    const { token } = window.localStorage;

    if (token && !hasLoggedIn) {
      onAsyncFetchUserData(token);
    }
  }

  componentDidUpdate() {
    const {
      error,
      history
    } = this.props;

    if (error === 401) {
      history.push('/register');
    }
  }

  render() {
    const {
      logItems,
      isMobile
    } = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

const {
  array,
  func,
  bool,
  oneOfType,
  string,
  object,
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
   * Async action that gets logs from the server
   */
  onAsyncFetchLogs: func.isRequired,
  /**
   * Async action which fetches the user's data
   */
  onAsyncFetchUserData: func.isRequired,
  /**
   * Error returned from the server
   */
  error: oneOfType([string, number]),
  /**
   * React Router Prop Injection
   */
  history: object.isRequired
};

LogScreen.defaultProps = {
  activeMenuLogId: [],
  error: {}
};

export default LogScreen;
