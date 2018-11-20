import { connect } from 'react-redux';
import GarageScreen from './garageScreen';
import { asyncFetchLogs } from '../logScreen/state/actions';


const mapStateToProps = state => ({
  motorcycles: state.garageScreen.motorcycles,
  selectedMotorcycle: state.logScreen.motorcycleId
});

const mapDispatchToProps = dispatch => ({
  onAsyncFetchLogs: motorcycleId => dispatch(asyncFetchLogs(motorcycleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GarageScreen);
