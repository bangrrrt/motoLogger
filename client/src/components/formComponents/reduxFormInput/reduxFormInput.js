import React from 'react';
import PropTypes from 'prop-types';

import './reduxFormInput.css';

const ReduxFormInput = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label htmlFor="label">{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const { string, object } = PropTypes;

ReduxFormInput.propTypes = {
  /**
   * redux-form prop injection
   */
  input: object.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  meta: object.isRequired
  /** */
};

export default ReduxFormInput;
