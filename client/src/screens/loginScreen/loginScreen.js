import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import ReduxFormInput from '../../components/formComponents/reduxFormInput/reduxFormInput';

import submit from './submit';

const LoginScreen = ({
  error,
  handleSubmit,
  pristine,
  reset,
  submitting
}) => (
  <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit(submit)}>
      <Field
        name="username"
        type="text"
        component={ReduxFormInput}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={ReduxFormInput}
        label="Password"
      />
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Log In
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  </div>
);

const { func, string, bool } = PropTypes;

LoginScreen.propTypes = {
  /**
   * Redux form prop injection
   */
  handleSubmit: func.isRequired,
  error: string,
  pristine: bool.isRequired,
  reset: func.isRequired,
  submitting: bool.isRequired
};

LoginScreen.defaultProps = {
  error: ''
};

export default reduxForm({
  form: 'login',
  onSubmit: submit
})(LoginScreen);
