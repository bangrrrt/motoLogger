import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './miles.css';

//  React motion causes unnecessary re-renders
class Miles extends Component {
	render() {
		const miles = this.props.miles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		return (
			<div className="log-item-mileage log-item-section">
				<div className="log-item-mileage-miles">
					<span>{miles} miles</span>
					{this.props.isExpanded && <span className="log-item-mileage-miles-fun">of smiles</span>}
				</div>
				<div>
					<span>{this.props.dateAdded}</span>
				</div>
			</div>
		);
	}
}

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
  isExpanded: false
};

export default Miles;
