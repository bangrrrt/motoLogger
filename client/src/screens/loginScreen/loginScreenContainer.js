import { connect } from 'react-redux';
import { asyncLoginUser } from './state/actions';

import loginScreen from './loginScreen';

const handleSubmit = (values, dispatch) => {
  dispatch(asyncLoginUser());
};

const mapStatToProps = state => ({
  state: state.login,
  onSubmit: handleSubmit
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(mapStatToProps, null)(loginScreen);
