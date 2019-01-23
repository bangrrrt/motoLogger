import React from 'react';
import PropTypes from 'prop-types';
import './formError.css';

const FormError = ({ errorMessage }) => <span className="form-error">{errorMessage}</span>;

FormError.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default FormError;
