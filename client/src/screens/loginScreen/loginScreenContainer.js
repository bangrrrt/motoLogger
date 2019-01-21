import { connect } from 'react-redux';
import { asyncLoginUser } from './state/actions';

import LoginScreen from './loginScreen';

const handleSubmit = (credentials, dispatch) => {
  dispatch(asyncLoginUser(credentials));
};

const mapStateToProps = state => ({
  onSubmit: handleSubmit,
  isAuthenticated: state.loginScreen.isAuthenticated,
  loginError: state.loginScreen.error,
  isLoading: state.loginScreen.isLoading
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(mapStateToProps, null)(LoginScreen);
