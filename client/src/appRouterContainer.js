import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asyncFetchUserData } from './screens/loginScreen/state/actions';

import AppRouter from './appRouter';

const mapStateToProps = state => ({
  isAuthenticated: state.loginScreen.isAuthenticated,
  loginError: state.loginScreen.error,
  isUserCreated: state.registerScreen.isUserCreated
});

const mapStatToDispatch = dispatch => ({
  onAsyncFetchUserData: token => dispatch(asyncFetchUserData(token))
});

export default withRouter(connect(mapStateToProps, mapStatToDispatch)(AppRouter));
