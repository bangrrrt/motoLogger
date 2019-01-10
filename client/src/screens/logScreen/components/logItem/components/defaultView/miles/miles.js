import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './miles.css';

//  React motion causes unnecessary re-renders
const Miles = ({
  miles,
  dateAdded,
  isExpanded
}) => {
  const formattedMiles = miles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedDate = moment(dateAdded).format('MM-DD-YY');

  return (
    <div className="log-item-mileage log-item-section">
      <div className="log-item-mileage-miles">
        <span>{formattedMiles} Miles</span>
        {isExpanded && <span className="log-item-mileage-miles-fun">of smiles</span>}
      </div>
      <div>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};


const { string, number, bool } = PropTypes;

Miles.propTypes = {
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
  miles: number,
  /**
   * If the component is expanded
   */
  isExpanded: bool
};

Miles.defaultProps = {
  miles: 0,
  dateAdded: moment(),
  isExpanded: false
};

export default Miles;
