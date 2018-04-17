import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { floatToAmount } from 'money-math';
import map from 'lodash/map';
import getTotalPartsAmount from '../../helper';

import './parts.css';

// Renders the default parts view
class Parts extends Component {

  renderExpandedContent = () => (
    <ul className="log-item-parts-details">
      {map(this.props.parts, (part, index) => {
        return (
          <li
            key={part.partName}
            className="log-item-part-detail"
          >
            {index >= 1 && <div className="log-item-part-detail-divider" />}
            <div className="log-item-part-details">
              <span>{part.partName}</span>
              <span>${floatToAmount(part.partPrice)}</span>
            </div>
          </li>
        )
      })}
    </ul>
  );

  render()  {
    const {
      parts,
      isExpanded
    } = this.props;

    return (
      <div>
        <div className={`log-item-total-parts ${isExpanded ? 'log-item-total-parts-expanded' : ''}`}>
          <span>{parts.length} Part{parts.length !== 1 ? 's' : ''}</span>
          <span>{getTotalPartsAmount(parts)}</span>
        </div>
        {isExpanded && this.renderExpandedContent()}
      </div>
    );
  }
}

const { string, array, bool } = PropTypes;

Parts.propTypes = {
  /**
   * Array of parts
   */
  parts: array,
  /**
   * The unique log id
   */
  logId: string.isRequired,
  /**
   * If the component is expanded
   */
  isExpanded: bool
};

Parts.defaultProps = {
  parts: [],
  isExpanded: false
};

export default Parts;