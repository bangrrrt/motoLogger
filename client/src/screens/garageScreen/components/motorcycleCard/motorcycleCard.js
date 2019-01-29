import React from 'react';
import PropTypes from 'prop-types';

import './motorcycleCard.css';

const MotorcycleCard = ({
  motorcycleId,
  name,
  make,
  model,
  year,
  onClick
}) => {
  return (
    <div
      key={name}
      role="button"
      onClick={() => onClick(motorcycleId)}
      className="garage-screen-motorcycle-card"
    >
      <h3>{name}</h3>
      <p>{year} {make} {model}</p>
    </div>
  );
};

const { string, number, func } = PropTypes;

MotorcycleCard.propTypes = {
  /**
   * Callback function to call when card is clicked
   */
  onClick: func.isRequired,
  /**
   * The user's custom motorcycle name
   */
  name: string,
  /**
   * The make of the motorcycle
   */
  make: string,
  /**
   * The model of the motorcycle
   */
  model: string,
  /**
   * The year of the motorcycle
   */
  year: number
};

MotorcycleCard.defaultProps = {
  name: '',
  make: '',
  model: '',
  year: 0
};

export default MotorcycleCard;
