import { connect } from 'react-redux';

import LogList from './logList';
import {
  createLog
} from '../../state/actions';

const mapStateToProps = state => ({
  isLoading: state.logScreen.isLoading
});

const mapStateToDispatch = dispatch => ({
  onCreateLog: () => dispatch(createLog())
});

export default connect(mapStateToProps, mapStateToDispatch)(LogList);
