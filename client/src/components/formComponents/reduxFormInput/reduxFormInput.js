import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './reduxFormInput.css';

const ReduxFormInput = ({
  meta: { touched, error },
  input,
  label,
  placeholder,
  type,
  isOptional,
  hasForgotPassword,
  autoComplete
}) => {
  const labelClasses = classnames({
    'redux-form-input-label': true,
    'redux-form-input-label-with-password': hasForgotPassword
  });

  return (
    <div className="redux-form-input">
      <label className={labelClasses} htmlFor="label">
        {label}
        {isOptional && <span className="redux-form-input-label-optional">(Optional)</span>}
        {hasForgotPassword && (
          <a
            className="redux-form-input-label-password"
            href="/login"
          >
            Forgot Password?
          </a>
        )}
      </label>
      <div className="redux-form-input-input-wrapper">
        <input className="redux-form-input-input" {...input} autoComplete={autoComplete} placeholder={placeholder} type={type} />
        {touched && error && <span className="redux-form-input-error">{error}</span>}
      </div>
    </div>
  );
};

const { string, object, bool } = PropTypes;

ReduxFormInput.propTypes = {
  /**
   * redux-form prop injection
   */
  input: object.isRequired,
  meta: object.isRequired,
  /** */

  /**
   * True if the password
   */
  hasForgotPassword: bool,
  /**
   * The placeholder text for the input
  */
  placeholder: string,
  /**
   * Input label name
  */
  label: string.isRequired,
  /**
   * Input type
   */
  type: string.isRequired,
  /**
   * True if the field value is optional
   */
  isOptional: bool,
  /**
   * The autoComplete attribute
   */
  autoComplete: string
};

ReduxFormInput.defaultProps = {
  isOptional: false,
  hasForgotPassword: false,
  autoComplete: '',
  placeholder: ''
};

export default ReduxFormInput;
