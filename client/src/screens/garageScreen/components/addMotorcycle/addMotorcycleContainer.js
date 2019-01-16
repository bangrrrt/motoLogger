import { connect } from 'react-redux';
import {
  asyncAddMotorcycle
} from '../../state/actions';

import AddMotorcycle from './addMotorcycle';

const handleSubmit = (newMotorcycle, dispatch) => {
  dispatch(asyncAddMotorcycle(newMotorcycle));
};

const mapStateToProps = state => ({
  onSubmit: handleSubmit,
  motorcycles: state.garageScreen.motorcycles,
  isEditing: state.garageScreen.isEditing,
  isLoading: state.garageScreen.isLoading,
  error: state.garageScreen.error
});

export default connect(mapStateToProps)(AddMotorcycle);
