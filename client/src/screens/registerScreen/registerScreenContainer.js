import { connect } from 'react-redux';
import asyncRegisterUser from './state/actions';

import registerScreen from './registerScreen';

const handleSubmit = (values, dispatch) => {
  dispatch(asyncRegisterUser(values));
};

const mapStateToProps = () => ({
  onSubmit: handleSubmit
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(mapStateToProps, null)(registerScreen);
