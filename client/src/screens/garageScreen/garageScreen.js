import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import AddMotorcycle from './components/addMotorcycle';
import MotorcycleCard from './components/motorcycleCard';

import './garageScreen.css';

const GarageScreen = ({
  motorcycles,
  onAsyncFetchLogs,
  selectedMotorcycle
}) => {
  if (!motorcycles) {
    return <AddMotorcycle />;
  }

  const renderMotorcycles = () => (
    <div>
      <h1 className="garage-screen-title">Garage</h1>
      <h4 className="garage-screen-sub-title">Choose a motorcycle to update</h4>
      <div className="garage-screen-motorcycles-wrapper">
        {motorcycles.map(motorcycle => (
          <MotorcycleCard
            key={motorcycle.id}
            {...motorcycle}
            onClick={onAsyncFetchLogs}
          />
        ))}
      </div>
    </div>
  );

  // If user has motorcycles map over and display motorcycle cards
  return (
    <Modal
      show={selectedMotorcycle === ''}
    >
      <Modal.Body>
        <div className="garage-screen">
          {motorcycles.length <= 0 && <AddMotorcycle />}
          {motorcycles.length > 0 && renderMotorcycles()}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const { arrayOf, object, func, string } = PropTypes;

GarageScreen.propTypes = {
  /**
   * The id of the selected motorcycle
   */
  selectedMotorcycle: string,
  /**
   * List of motorcycles the user has in their garage
   */
  motorcycles: arrayOf(object).isRequired,
  /**
   * Async action to fetch logs related to a motorcycle
   */
  onAsyncFetchLogs: func.isRequired
};

GarageScreen.defaultProps = {
  selectedMotorcycle: ''
};

export default GarageScreen;
