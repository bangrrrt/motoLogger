import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './milesEditing.css';

//  React motion causes unnecessary re-renders
class Miles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      milesInput: this.props.miles || '',
      date: moment(this.props.dateAdded, 'MMM-DD-YYYY') || moment()
    };
  }

  handleUpdateDate(date) {
    this.setState({
      ...this.state,
      date
    });

    this.props.onUpdateDate(date, this.props.logId);
  }

  render() {
    return (
      <div className="log-item-miles-input-wrapper">
        <FormGroup
          controlId={`${this.props.logId}-mileS`}
          className="log-item-miles-inputs"
        >
          <div className="log-item-miles-input-container">
            <i className="glyphicon glyphicon-road" />
            <FormControl
              className="log-item-miles-input"
              placeholder="Current Miles"
              type="number"
              step={1}
              value={this.state.milesInput}
              onBlur={() => this.props.onAddLogMiles(this.state.milesInput, this.props.logId)}
              onChange={e => this.setState({ milesInput: parseInt(e.target.value, 10) })}
              readOnly={!this.props.isEditable}
            />
          </div>
          <div className="log-item-miles-date-picker">
            <i className="glyphicon glyphicon-calendar" />
            <DatePicker
              selected={this.state.date}
              onChange={date => this.handleUpdateDate(date)}
              withPortal
            />
          </div>
        </FormGroup>
      </div>
    );
  }
}

const { string, func, number, bool } = PropTypes;

Miles.propTypes = {
  /**
   * Action that updates the log creation date
   */
  onUpdateDate: func.isRequired,
  /**
   * True if the log is in edit mode
   */
  isEditable: bool.isRequired,
  /**
   * Action that adds miles to the log item
   */
  onAddLogMiles: func.isRequired,
  /**
   * The unique log id
   */
  logId: string.isRequired,
  /**
   * When the log was created
   */
  dateAdded: string,
  /**
   * How many miles the motorcycle had at this time
   */
  miles: number
};

Miles.defaultProps = {
  miles: 0
};

export default Miles;
