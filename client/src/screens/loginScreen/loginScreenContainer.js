import { connect } from 'redux';
import { submit } from 'redux-form';


import loginScreen from './loginScreen';

const mapStatToProps = state => ({
  state: state.login
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: () => dispatch(submit('form'))
});

export default connect(mapStatToProps, mapDispatchToProps)(loginScreen);
