import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import ReduxFormInput from '../../components/formComponents/reduxFormInput/reduxFormInput';
import validate from './validate';

import './registerScreen.css';

const RegisterScreen = ({
  onSubmit,
  handleSubmit,
  submitting
}) => {
  // Used by recaptcha to submit form after verifying human interaction
  function onCaptchaSubmit(token) {
    document.getElementById('registerForm').submit();
  }

  return (
    <div className="register-screen-wrapper register-screen-animation">
      <div className="register-screen">
        <h1 className="register-screen-title">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="firstName"
            type="text"
            component={ReduxFormInput}
            label="First Name"
            placeholder="First name"
          />
          <Field
            name="lastName"
            type="text"
            component={ReduxFormInput}
            label="Last Name"
            placeholder="Last name"
          />
          <Field
            name="email"
            type="email"
            component={ReduxFormInput}
            label="Email Address"
            placeholder="Email Address"
          />
          <Field
            name="password"
            type="password"
            component={ReduxFormInput}
            label="Password"
            placeholder="Password"
          />
          <div className="register-screen-button-wrapper">
            <button
              type="submit"
              disabled={submitting}
              className="g-recaptcha register-screen-button"
              data-sitekey="6LfJrXEUAAAAAIwFzx5HnHY2xuhmwe8DqRBu0Xcb"
              data-badge="bottomright"
              data-callback="onCaptchaSubmit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const { func, bool, string } = PropTypes;

RegisterScreen.propTypes = {
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

RegisterScreen.defaultProps = {
  error: ''
};

export default reduxForm({
  form: 'register',
  validate
})(RegisterScreen);
