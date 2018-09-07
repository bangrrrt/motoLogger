import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import ReduxFormInput from '../../components/formComponents/reduxFormInput/reduxFormInput';

import './loginScreen.css';

const LoginScreen = ({
  error,
  onSubmit,
  handleSubmit,
  submitting
}) => (
  <div className="login-screen-wrapper">
    <div className="login-screen">
      <h3 className="login-screen-title">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          autoComplete="username"
          name="username"
          type="text"
          component={ReduxFormInput}
          label="Username"
          placeholder="Email Address"
        />
        <Field
          autoComplete="current-password"
          name="password"
          hasForgotPassword
          type="password"
          component={ReduxFormInput}
          label="Password"
          placeholder="Your Secret"
        />
        {error && <strong>{error}</strong>}
        <div className="login-screen-button-wrapper">
          <button
            type="submit"
            disabled={submitting}
            className="login-screen-button"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  </div>
);

const { func, string, bool } = PropTypes;

LoginScreen.propTypes = {
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

LoginScreen.defaultProps = {
  error: ''
};

export default reduxForm({
  form: 'login'
})(LoginScreen);
