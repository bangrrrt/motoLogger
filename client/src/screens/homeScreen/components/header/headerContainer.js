import { connect } from 'react-redux';
import Header from './header';
import { toggleMobileHomeScreenMenu } from '../../state/actions';

const mapStateToProps = state => ({
  isMenuOpen: state.homeScreen.isMenuOpen,
  isHeaderVisible: state.homeScreen.isHeaderVisible
});

const mapStateToDispatch = dispatch => ({
  onToggleMenu: () => dispatch(toggleMobileHomeScreenMenu())
});

export default connect(mapStateToProps, mapStateToDispatch)(Header);
