import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';


import FormError from '../../components/formError';
import ReduxFormInput from '../../components/formComponents/reduxFormInput/reduxFormInput';
import validate from './validate';

import './registerScreen.css';
import ScreenLoader from '../../components/screenLoader';

class RegisterScreen extends Component {
  render() {
    const {
      submitting,
      handleSubmit,
      onSubmit,
      error,
      registerError,
      isLoading
    } = this.props;

    return (
      <div className="register-screen-wrapper register-screen-animation">
        <div className="register-screen">
          {isLoading && <ScreenLoader />}
          <h1 className="register-screen-title">Register</h1>
          <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
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
              name="username"
              type="email"
              component={ReduxFormInput}
              label="Email Address"
              placeholder="Email "
            />
            <Field
              name="password"
              type="password"
              component={ReduxFormInput}
              label="Password"
              placeholder="Password"
            />
            {(registerError || error) && <FormError errorMessage={registerError || error} />}
            <div className="register-screen-button-wrapper">
              <button
                type="submit"
                disabled={submitting}
                className="register-screen-button"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const {
  func,
  bool,
  string,
  object
} = PropTypes;

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
  onSubmit: func.isRequired,
  /**
   * True if the screen is loading
   */
  isLoading: bool,
  /**
   * React router prop injection
   */
  history: object.isRequired,
  /**
   * Error returned from the server
   */
  registerError: string
};

RegisterScreen.defaultProps = {
  error: '',
  registerError: '',
  isLoading: false
};

export default reduxForm({
  form: 'register',
  validate
})(withRouter(RegisterScreen));
