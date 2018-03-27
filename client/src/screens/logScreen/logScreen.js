import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import LogList from './components/logList/logList';

import './logScreen.css';

// Renders the log screen where all the logs are visible
class LogScreen extends Component {
  componentDidMount() {
    this.props.onAsyncFetchLogs();
  }

  render() {
    const {
      logItems,
      isMobile
    } = this.props;

    return (
      <Grid
        className="log-screen"
        style={{ width: isMobile ? '100%' : '' }}
      >
        <Row>
          <Col xs={12}>
            <LogList logs={logItems} id="logId" />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const { array, func, bool } = PropTypes;

LogScreen.propTypes = {
  /**
   * If true the app is being viewed from a mobile device
   */
  isMobile: bool.isRequired,
  // Array of list items
  logItems: array.isRequired,
  // True if the screen is in editing mode
  activeMenuLogId: array.isRequired,
  // Async action that gets logs from the server
  onAsyncFetchLogs: func.isRequired
}

export default LogScreen;
