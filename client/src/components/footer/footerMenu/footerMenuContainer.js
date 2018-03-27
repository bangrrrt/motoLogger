import { connect } from 'react-redux';

import { onToggleFooterMenu } from '../../../state/actions';
import FooterMenu from './footerMenu';

const mapStateToProps = state => ({
  isFooterMenuOpen: state.app.isFooterMenuOpen
});

const mapStateToDispatch = dispatch => ({
  onToggleFooterMenu: () => dispatch(onToggleFooterMenu())
});

export default connect(mapStateToProps, mapStateToDispatch)(FooterMenu);
