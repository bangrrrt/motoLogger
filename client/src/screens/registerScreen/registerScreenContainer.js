import { connect } from 'react-redux';
import asyncRegisterUser from './state/actions';

import registerScreen from './registerScreen';

const handleSubmit = (registerData, dispatch) => {
  dispatch(asyncRegisterUser(registerData));
};

const mapStatToProps = state => ({
  onSubmit: handleSubmit
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(mapStatToProps, null)(registerScreen);
