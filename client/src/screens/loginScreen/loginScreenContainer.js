import { connect } from 'react-redux';
import { asyncLoginUser } from './state/actions';

import loginScreen from './loginScreen';

const handleSubmit = (credentials, dispatch) => {
  dispatch(asyncLoginUser(credentials));
};

const mapStateToProps = state => ({
  onSubmit: handleSubmit,
  isAuthenticated: state.loginScreen.isAuthenticated
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(mapStateToProps, null)(loginScreen);
