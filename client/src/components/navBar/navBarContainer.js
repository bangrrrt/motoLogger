import { connect } from 'react-redux';
import NavBar from './navBar';
import { onToggleFooterMenu, isAppViewMobile } from '../../state/actions';
import { createLog } from '../../screens/logScreen/state/actions';

const mapStateToProps = state => ({
  activeMenuLogId: state.logScreen.activeMenuLogId,
  isMobile: state.app.isMobile,
  isEditing: state.logScreen.isEditing
});

const mapStateToDispatch = dispatch => ({
  onCreateLog: () => dispatch(createLog()),
  onToggleFooterMenu: () => dispatch(onToggleFooterMenu()),
  onAppViewMobile: isMobile => dispatch(isAppViewMobile(isMobile))
});

export default connect(mapStateToProps, mapStateToDispatch)(NavBar);
