import { connect } from 'react-redux';
import LogScreen from './logScreen';

const mapStateToProps = state => ({
  logItems: state.logScreen.logItems,
  activeMenuLogId: state.logScreen.activeMenuLogId,
  isMobile: state.app.isMobile,
  motorcycles: state.garageScreen.motorcycles,
  hasLoggedIn: state.loginScreen.isAuthenticated,
  error: state.logScreen.error
});

export default connect(mapStateToProps)(LogScreen);
