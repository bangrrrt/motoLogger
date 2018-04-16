import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import chunk from 'lodash/chunk';
import debounce from 'lodash/debounce';
import {
  Row,
  Col
} from 'react-bootstrap';

import LogItemContainer from '../logItem/logItemContainer';

import './logList.css';

// Renders a list of logs
class LogList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chunkSize: 3
    };
  }

  componentDidMount() {
    this.getChunkSize();
    window.addEventListener('resize', debounce(this.getChunkSize, 250));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.getChunkSize, 250));
  }

  getChunkSize = () => {
    const width = window.innerWidth;

    if (width <= 480) {
      this.setState({ chunkSize: 1 });
    } else if (width <= 1024) {
      this.setState({ chunkSize: 2 });
    } else {
      this.setState({ chunkSize: 3 });
    }
  }

  renderLogList = logs => (
    map(logs, log => (
      <Col
        className="log-list-column"
        key={log.logId}
        lg={4}
        sm={6}
      >
        <LogItemContainer log={log} />
      </Col>
    ))
  )

  renderChunkedLogs = () => {
    const chunkedLogs = chunk(this.props.logs, this.state.chunkSize);

    return map(chunkedLogs, (logs, index) => (
      <Row
        key={logs[0].logId}
        className="log-list-row"
      >
        {this.renderLogList(logs, index)}
      </Row>
    ));
  }

  renderPlaceholder = () => {
    if (this.props.isLoading) {
      return (
        <div>
          <i className="log-list-loading glyphicon glyphicon-wrench" />
          <h4>Loading...</h4>
        </div>
      );
    }

    const addLogTextLink = (
      <span
        className="log-list-text-link"
        onClick={() => {
          this.props.onAsyncCreateLog();
        }}
      >
        click here.
      </span>
    );

    return (
      <div>
        <h3>Looks like you have no logs</h3>
        <p>To get started click on the plus icon or {addLogTextLink}</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        {!this.props.logs.length ? this.renderPlaceholder() : this.renderChunkedLogs()}
      </div>
    );
  }
}

const { array, func, bool } = PropTypes;

LogList.propTypes = {
  /**
   * True when the app is loading data
   */
  isLoading: bool.isRequired,
  /**
   * Async action to create a log
   */
  onAsyncCreateLog: func.isRequired,
  /**
   * An array of logs
   */
  logs: array.isRequired
};

export default LogList;
