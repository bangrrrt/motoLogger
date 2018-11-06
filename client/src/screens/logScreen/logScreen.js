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
    this.props.onAsyncFetchLogs(123);
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

const { array, func, bool, arrayOf, object } = PropTypes;

LogScreen.propTypes = {
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
  onAsyncFetchLogs: func.isRequired
};

export default LogScreen;
