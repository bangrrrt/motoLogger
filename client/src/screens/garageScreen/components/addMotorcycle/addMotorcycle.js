import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import ReduxFormInput from '../../../../components/formComponents/reduxFormInput/reduxFormInput';
// import validate from './validate';
import './addMotorcycle.css';

const AddMotorcycle = ({
  handleSubmit,
  onSubmit,
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <p>
        Loading...
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
        <Field
          name="miles"
          type="text"
          component={ReduxFormInput} // Create ReduxForm number input
          label="Current Miles"
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
  string
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
   * True if app is loading
   */
  isLoading: bool.isRequired
};

AddMotorcycle.defaultProps = {
  error: ''
};

export default reduxForm({
  form: 'addMotorcycle',
  // validate
})(AddMotorcycle);
