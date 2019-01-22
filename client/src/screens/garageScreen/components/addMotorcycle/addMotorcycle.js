import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import ReduxFormInput from '../../../../components/formComponents/reduxFormInput/reduxFormInput';
// import validate from './validate';


const AddMotorcycle = ({
  isEditing,
  handleSubmit,
  onSubmit,
  motorcycles,
  isLoading,
  error
}) => {
  let text = 'Add your first motorcycle';
  const hasMotorcycles = motorcycles && motorcycles.length;

  if (hasMotorcycles) {
    text = 'Add another motorcycle';
  } else if (hasMotorcycles && isEditing) {
    text = 'Edit Motorcycle';
  }

  if (isLoading) {
    return (
      <p>
        Saving...
      </p>
    );
  }

  if (error) {
    return (
      <p>{error}</p>
    );
  }

  return (
    <div>
      <h1>{text}</h1>
      <form id="addMotorcycle" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="name"
          type="text"
          component={ReduxFormInput}
          label="Motorcycle Name"
        />
        <Field
          name="make"
          type="text"
          component={ReduxFormInput}
          label="Make"
        />
        <Field
          name="model"
          type="text"
          component={ReduxFormInput}
          label="Model"
        />
        <Field
          name="year"
          type="text"
          component={ReduxFormInput} // Create ReduxForm number input using date-picker only year selector
          label="Year"
        />
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

const {
  bool,
  func,
  string,
  object,
  arrayOf
} = PropTypes;

AddMotorcycle.propTypes = {
  /**
   * Redux form prop injection
   */
  handleSubmit: func.isRequired,
  error: string,
  submitting: bool.isRequired,
  /**
   * Handles form submission
   */
  onSubmit: func.isRequired,
  /**
   * True when a user is editing a motorcycle
   */
  isEditing: bool,
  /**
   * List of motorcycles
   */
  motorcycles: arrayOf(object).isRequired,
  /**
   * True if app is loading
   */
  isLoading: bool.isRequired
};

AddMotorcycle.defaultProps = {
  isEditing: false,
  error: ''
};

export default reduxForm({
  form: 'addMotorcycle',
  // validate
})(AddMotorcycle);
