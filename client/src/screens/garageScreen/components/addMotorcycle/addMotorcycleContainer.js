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
  error: state.garageScreen.error
});

export default connect(mapStateToProps)(AddMotorcycle);
