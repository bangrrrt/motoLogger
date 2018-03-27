import { connect } from 'react-redux';
import NavBar from './navBar';
import { onToggleFooterMenu, isAppViewMobile } from '../../state/actions';
import { asyncCreateLog } from '../../screens/logScreen/state/actions';

const mapStateToProps = state => ({
  activeMenuLogId: state.logScreen.activeMenuLogId,
  isMobile: state.app.isMobile
});

const mapStateToDispatch = dispatch => ({
  onAsyncCreateLog: () => dispatch(asyncCreateLog()),
  onToggleFooterMenu: () => dispatch(onToggleFooterMenu()),
  onAppViewMobile: isMobile => dispatch(isAppViewMobile(isMobile))
});

export default connect(mapStateToProps, mapStateToDispatch)(NavBar);
