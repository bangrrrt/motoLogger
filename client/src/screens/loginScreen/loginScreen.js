import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import ReduxFormInput from '../../components/formComponents/reduxFormInput/reduxFormInput';

import './loginScreen.css';

class LoginScreen extends Component {
  componentDidMount() {
    const { history } = this.props;

    if (window.localStorage.token) {
      history.push('/logs');
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated, history } = this.props;

    if (isAuthenticated !== prevProps.isAuthenticated) {
      history.push('/logs');
    }
  }

  render() {
    const {
      error,
      onSubmit,
      handleSubmit,
      submitting
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
        <div className="login-screen-register">
          <h5>Don't have an account?</h5>
          <h3 className="login-screen-register-title">
            <Link
              to="/register"
              className="login-screen-register-title-link"
            >
              Register Now
            </Link>
          </h3>
        </div>
      </div>
    );
  }
}

const { func, string, bool, object } = PropTypes;

LoginScreen.propTypes = {
  /**
   * React Router prop injection
   */
  history: object.isRequired,
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
   * True if user logged in successfully
   */
  isAuthenticated: bool.isRequired
};

LoginScreen.defaultProps = {
  error: ''
};

export default reduxForm({
  form: 'login'
})(withRouter(LoginScreen));
