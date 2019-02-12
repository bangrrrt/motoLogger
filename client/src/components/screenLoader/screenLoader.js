import React from 'react';
import PropTypes from 'prop-types';

import './screenLoader.css';

const ScreenLoader = ({ isFullScreen }) => (
  <div className="screen-loader-wrapper">
    <div>
      <i className="screen-loader-icon glyphicon glyphicon-wrench" />
      <h4>Loading...</h4>
    </div>
  </div>
);

const {
  bool
} = PropTypes;

ScreenLoader.propTypes = {
  isFullScreen: bool
};

ScreenLoader.defaultProps = {
  isFullScreen: true
};

export default ScreenLoader;
