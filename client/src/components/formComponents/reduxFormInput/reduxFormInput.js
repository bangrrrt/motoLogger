import React from 'react';
import PropTypes from 'prop-types';

import './reduxFormInput.css';

const ReduxFormInput = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className="redux-form-input">
    <label className="redux-form-input-label" htmlFor="label">{label}</label>
    <div className="redux-form-input-input-wrapper">
      <input className="redux-form-input-input" {...input} placeholder={placeholder} type={type} />
      {touched && error && <span className="redux-form-input-error">{error}</span>}
    </div>
  </div>
)

const { string, object } = PropTypes;

ReduxFormInput.propTypes = {
  /**
   * redux-form prop injection
   */
  input: object.isRequired,
  meta: object.isRequired,
  /**
   * The placeholder text for the input
  */
  placeholder: string.isRequired,
  /**
   * Input label name
  */
  label: string.isRequired,
  /**
   * Input type
   */
  type: string.isRequired
  /** */
};

export default ReduxFormInput;
