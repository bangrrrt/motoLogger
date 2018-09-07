import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import NavBarContainer from '../../components/navBar/navBarContainer';
import LogListContainer from './components/logList/logListContainer';
import FooterContainer from '../../components/footer/footerContainer';

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
      <div>
        <NavBarContainer />
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
