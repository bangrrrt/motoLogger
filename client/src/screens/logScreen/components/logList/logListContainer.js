import { connect } from 'react-redux';

import LogList from './logList';
import {
  asyncCreateLog
} from '../../state/actions';

const mapStateToProps = state => ({
  isLoading: state.logScreen.isLoading
});

const mapStateToDispatch = dispatch => ({
  onAsyncCreateLog: () => dispatch(asyncCreateLog())
});

export default connect(mapStateToProps, mapStateToDispatch)(LogList);
