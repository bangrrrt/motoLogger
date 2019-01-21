import { connect } from 'react-redux';
import LogScreen from './logScreen';
import { asyncFetchLogs } from './state/actions';
import { asyncFetchUserData } from '../loginScreen/state/actions';

const mapStateToProps = state => ({
  logItems: state.logScreen.logItems,
  activeMenuLogId: state.logScreen.activeMenuLogId,
  isMobile: state.app.isMobile,
  motorcycles: state.garageScreen.motorcycles,
  hasLoggedIn: state.loginScreen.isAuthenticated,
  error: state.logScreen.error
});

const mapStateToDispatch = dispatch => ({
  onAsyncFetchLogs: motorcycleId => dispatch(asyncFetchLogs(motorcycleId)),
  onAsyncFetchUserData: token => dispatch(asyncFetchUserData(token))
});

export default connect(mapStateToProps, mapStateToDispatch)(LogScreen);
