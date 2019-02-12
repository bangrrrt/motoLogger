import { connect } from 'react-redux';
import asyncRegisterUser from './state/actions';

import registerScreen from './registerScreen';

const handleSubmit = (values, dispatch) => {
  window.grecaptcha.ready(() => {
    window.grecaptcha.execute(process.env.siteKey, { action: 'register' })
      .then((token) => {
        dispatch(asyncRegisterUser(values, token));
      }, err => console.log('captcha error', err));
  });
};

const mapStateToProps = state => ({
  onSubmit: handleSubmit,
  registerError: state.registerScreen.error,
  isLoading: state.registerScreen.isLoading
});

export default connect(mapStateToProps, null)(registerScreen);
