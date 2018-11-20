import React from 'react';
import PropTypes from 'prop-types';

const AddMotorcycle = ({
  isEditing
}) => {
  const text = isEditing ? 'Edit Motorcycle' : 'Add your first motorcycle!';
  return (
    <div>
      <h4>{text}</h4>
      <div>
        <input
          type="text"
        />
        <button
          onClick={() => console.log('Motorcycle added')}
        >
          Add
        </button>
      </div>
    </div>
  );
};

const { bool } = PropTypes;

AddMotorcycle.propTypes = {
  /**
   * True when a user is editing a motorcycle
   */
  isEditing: bool
};

AddMotorcycle.defaultProps = {
  isEditing: false
};

export default AddMotorcycle;
