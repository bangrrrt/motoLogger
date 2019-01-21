import { connect } from 'react-redux';
import asyncRegisterUser from './state/actions';

import registerScreen from './registerScreen';

const handleSubmit = (values, dispatch) => {
  dispatch(asyncRegisterUser(values));
};

const mapStateToProps = state => ({
  onSubmit: handleSubmit,
  isUserCreated: state.registerScreen.isUserCreated
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(mapStateToProps, null)(registerScreen);
