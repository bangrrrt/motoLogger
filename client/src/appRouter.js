import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';

import HomeScreen from './screens/homeScreen/homeScreen';
import LogScreenContainer from './screens/logScreen/logScreenContainer';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToken: this.hasToken()
    };
  }
  componentDidMount() {
    const { onAsyncFetchUserData } = this.props;
    const { token } = window.localStorage;

    if (token) {
      onAsyncFetchUserData(token);
    }
  }


  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated && this.hasToken()) {
      this.setState({ hasToken: true });
    }
  }

  /**
   * Function that checks if a token exists in local storage
   */
  hasToken = () => window.localStorage.token !== undefined

  render() {
    const {
      isAuthenticated,
      isUserCreated
    } = this.props;

    const renderHomeScreen = () => (
      (this.state.hasToken && isAuthenticated) || isUserCreated ? <Redirect push to="/logs" /> : <HomeScreen />
    );

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={renderHomeScreen}
        />
        <Route
          path="/home"
          render={renderHomeScreen}
        />
        <Route
          path="/logs"
          render={() => (isAuthenticated || isUserCreated ?
            <LogScreenContainer /> : <Redirect push to="/" />
          )}
        />
        <Route path="/login" component={HomeScreen} />
        <Route path="/register" component={HomeScreen} />
      </Switch>
    );
  }
}

const {
  string,
  bool,
  func
} = PropTypes;

AppRouter.propTypes = {
  /**
   * True if user has successfully logged in
   */
  isAuthenticated: bool,
  /**
   * True if user has successfully registered
   */
  isUserCreated: bool,
  /**
   * The server's login error message
   */
  loginError: string,
  /**
   * Async action which fetches the user's data
   */
  onAsyncFetchUserData: func.isRequired
};

AppRouter.defaultProps = {
  isAuthenticated: false,
  loginError: '',
  isUserCreated: false
};

export default AppRouter;
