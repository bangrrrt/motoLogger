import React from 'react';
import PropTypes from 'prop-types';
import AddMotorcycle from './components/addMotorcycle';

import './garageScreen.css';

const GarageScreen = ({ motorcycles }) => {
  if (motorcycles && !motorcycles.length) {
    return null;
  }

  return (
    <div>
      <AddMotorcycle />
    </div>
  );
};

const { arrayOf, object } = PropTypes;

GarageScreen.propTypes = {
  /**
   * List of motorcycles the user has in their garage
   */
  motorcycles: arrayOf(object).isRequired
};

GarageScreen.defaultProps = {

};

export default GarageScreen;
