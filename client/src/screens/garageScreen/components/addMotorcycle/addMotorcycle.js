import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import ReduxFormInput from '../../../../components/formComponents/reduxFormInput/reduxFormInput';
import validate from './validate';
import './addMotorcycle.css';

const AddMotorcycle = ({
  handleSubmit,
  onSubmit,
  error
}) => {
  if (error) {
    return (
      <p>{error}</p>
    );
  }

  const normalizeAmount = value => parseInt(value.replace(/,/g, ''), 10);

  const formatAmount = (input = '') => {
    if (!input) {
      return '';
    }

    const value = input.toString();

    if (Number.isNaN(parseInt(value[value.length - 1], 10))) {
      return value.slice(0, -1);
    }

    return value
      .replace(/,/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (value) => {
    const num = Number(value);
    if (num === Number.isNaN() || num === 0) {
      return '';
    }

    return num;
  };

  return (
    <div>
      <form id="addMotorcycle" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="name"
          type="text"
          component={ReduxFormInput}
          label="Motorcycle Nickname"
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
          type="number"
          component={ReduxFormInput}
          parse={parseNumber}
          label="Year"
        />
        <Field
          name="miles"
          parse={val => val.toString()}
          type="text"
          format={formatAmount}
          normalize={normalizeAmount}
          component={ReduxFormInput}
          label="Current Miles"
        />
        <div className="garage-screen-add-motorcycle-submit-wrapper">
          <button
            className="garage-screen-add-motorcycle-submit"
            type="submit"
          >
            Add
          </button>
        </div>
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
  onSubmit: func.isRequired
};

AddMotorcycle.defaultProps = {
  error: ''
};

export default reduxForm({
  form: 'addMotorcycle',
  validate
})(AddMotorcycle);
