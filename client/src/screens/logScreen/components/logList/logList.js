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

  renderLogList = (logs) => {
    return map(logs, (log) => {
      return (
        <Col
          className="log-list-column"
          key={log.logId}
          lg={4}
          sm={6}
        >
          <LogItemContainer log={log} />
        </Col>
      );
    });
  }

  render() {
    const chunkedLogs = chunk(this.props.logs, this.state.chunkSize);

    return (
      <div>
        {map(chunkedLogs, (logs, index) => {
          return (
            <Row
              key={logs[0].logId}
              className="log-list-row"
            >
              {this.renderLogList(logs, index)}
            </Row>
          );
        })}
      </div>
    );
  }
}

const { array } = PropTypes;

LogList.propTypes = {
  // An array of logs
  logs: array.isRequired
};

export default LogList;