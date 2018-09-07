import { connect } from 'react-redux';
import Body from './body';

import { toggleHeaderVisibility } from '../../state/actions';

const mapStateToProps = state => ({
  isHeaderVisible: state.homeScreen.isHeaderVisible
});

const mapStateToDispatch = dispatch => ({
  toggleHeaderVisibility: isVisible => dispatch(toggleHeaderVisibility(isVisible))
});

export default connect(mapStateToProps, mapStateToDispatch)(Body);
