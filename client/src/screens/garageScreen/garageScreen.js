import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import AddMotorcycleContainer from './components/addMotorcycle/addMotorcycleContainer';
import MotorcycleCard from './components/motorcycleCard';

import './garageScreen.css';

const GarageScreen = ({
  motorcycles,
  onAsyncFetchLogs,
  selectedMotorcycle,
  isEditing,
  isLoading
}) => {
  const renderMotorcycles = () => (
    <div>
      <h4 className="garage-screen-motorcycles-title">Choose a motorcycle to update</h4>
      <div className="garage-screen-motorcycles-wrapper">
        {motorcycles.map(motorcycle => (
          <MotorcycleCard
            key={motorcycle.name}
            {...motorcycle}
            onClick={onAsyncFetchLogs}
          />
        ))}
      </div>
    </div>
  );

  let subTitle = 'Let\'s add your first motorcycle';
  const hasMotorcycles = motorcycles && motorcycles.length;

  // Needs another condition
  if (hasMotorcycles && false) {
    subTitle = 'Add another motorcycle';
  } else if (hasMotorcycles && isEditing) {
    subTitle = 'Edit Motorcycle';
  } else if (hasMotorcycles) {
    subTitle = '';
  }

  const mainTitle = hasMotorcycles ? 'Garage' : 'Welcome to Motorlogger!';

  // If user has motorcycles map over and display motorcycle cards
  return (
    <Modal
      show={selectedMotorcycle === ''}
    >
      <Modal.Title componentClass="div" className="garage-screen-title">
        <h1 className="garage-screen-main-title">{mainTitle}</h1>
        <h3 className="garage-screen-sub-title">{subTitle}</h3>
      </Modal.Title>
      <Modal.Body>
        <div className="garage-screen">
          {hasMotorcycles <= 0 && !isLoading && <AddMotorcycleContainer />}
          {hasMotorcycles > 0 && renderMotorcycles()}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const {
  arrayOf,
  object,
  func,
  string,
  bool
} = PropTypes;

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
  onAsyncFetchLogs: func.isRequired,
  /**
   * True when a user is editing a motorcycle
   */
  isEditing: bool,
  /**
   * True if the app is loading
   */
  isLoading: bool.isRequired
};

GarageScreen.defaultProps = {
  selectedMotorcycle: '',
  isEditing: false
};

export default GarageScreen;
