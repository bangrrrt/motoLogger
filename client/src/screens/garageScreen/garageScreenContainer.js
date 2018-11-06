import { connect } from 'react-redux';
import GarageScreen from './garageScreen';

const mapStateToProps = state => ({
  motorcycles: state.garageScreen.motorcycles
});

export default connect(mapStateToProps)(GarageScreen);
