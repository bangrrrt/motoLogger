import { connect } from 'react-redux';
import { asyncLoginUser } from './state/actions';

import loginScreen from './loginScreen';

const handleSubmit = (credentials, dispatch) => {
  dispatch(asyncLoginUser(credentials));
};

const mapStatToProps = state => ({
  onSubmit: handleSubmit
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(mapStatToProps, null)(loginScreen);
