import { connect } from 'react-redux';
import LogItem from './logItem';
import {
  asyncDeleteLog,
  onEditLog,
  asyncUpdateLogs,
  onToggleMenu,
  onAddLogPart,
  onDeleteLogParts,
  onAddLogMiles,
  onUpdateDate
} from '../../state/actions';

const mapStateToProps = (state) => {
  return {
    activeMenuLogId: state.logScreen.activeMenuLogId
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    onToggleMenu: logId => dispatch(onToggleMenu(logId)),
    onEditLog: logId => dispatch(onEditLog(logId)),
    onAsyncDeleteItem: logId => dispatch(asyncDeleteLog(logId)),
    onAsyncUpdateLog: editingLog => dispatch(asyncUpdateLogs(editingLog)),
    onAddLogPart: (newPart, logId) => dispatch(onAddLogPart(newPart, logId)),
    onDeleteLogParts: (partsIndex, logId) => dispatch(onDeleteLogParts(partsIndex, logId)),
    onAddLogMiles: (miles, logId) => dispatch(onAddLogMiles(miles, logId)),
    onUpdateDate: (date, logId) => dispatch(onUpdateDate(date, logId))
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(LogItem);
