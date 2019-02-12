import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import ReduxFormInput from '../../components/formComponents/reduxFormInput/reduxFormInput';
import ScreenLoader from '../../components/screenLoader';

import './loginScreen.css';

class LoginScreen extends Component {
  renderRegisterButton = () => {
    const {
      onRegisterClick
    } = this.props;

    if (onRegisterClick && typeof onRegisterClick === 'function') {
      return (
        <button
          className="login-screen-register-title-link"
          onClick={() => onRegisterClick()}
        >
          Register Now
        </button>
      );
    }

    return (
      <Link
        to="/register"
        className="login-screen-register-title-link"
      >
        Register Now
      </Link>
    );
  }

  render() {
    const {
      error,
      isLoading,
      onSubmit,
      handleSubmit,
      submitting,
      loginError
    } = this.props;

    return (
      <div className="login-screen-wrapper">
        <div className="login-screen">
          <h1 className="login-screen-title">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              name="username"
              type="text"
              component={ReduxFormInput}
              label="Username"
              placeholder="Email Address"
            />
            <Field
              name="password"
              hasForgotPassword
              type="password"
              component={ReduxFormInput}
              label="Password"
              placeholder="Your Secret"
            />
            {isLoading && <ScreenLoader />}
            {error && <span className="login-screen-error">{error}</span>}
            {loginError && <span className="login-screen-error">{loginError}</span>}
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
        <div className="login-screen-register">
          <h5>Don't have an account?</h5>
          <h3 className="login-screen-register-title">
            {this.renderRegisterButton()}
          </h3>
        </div>
      </div>
    );
  }
}

const {
  func,
  string,
  bool
} = PropTypes;

LoginScreen.propTypes = {
  /**
   * Redux form prop injection
   */
  handleSubmit: func.isRequired,
  error: string,
  submitting: bool.isRequired,
  /**
   * Callback function for register button
   */
  onRegisterClick: func,
  /**
   * Handles form submission
   */
  onSubmit: func.isRequired,
  /**
   * True if app is loading
   */
  isLoading: bool.isRequired,
  /**
   * True if user logged in successfully
   */
  isAuthenticated: bool.isRequired,
  /**
   * Error from the server
   */
  loginError: string
};

LoginScreen.defaultProps = {
  loginError: '',
  error: '',
  onRegisterClick: null
};

export default reduxForm({
  form: 'login'
})(LoginScreen);
