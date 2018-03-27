import { connect } from 'react-redux';
import LogScreen from './logScreen';
import { asyncFetchLogs } from './state/actions';

const mapStateToProps = state => ({
  logItems: state.logScreen.logItems,
  activeMenuLogId: state.logScreen.activeMenuLogId,
  isMobile: state.app.isMobile
});

const mapStateToDispatch = dispatch => ({
  onAsyncFetchLogs: () => dispatch(asyncFetchLogs())
});

export default connect(mapStateToProps, mapStateToDispatch)(LogScreen);
