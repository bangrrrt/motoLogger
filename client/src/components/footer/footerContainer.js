import { connect } from 'react-redux';
import Footer from './footer';

const mapStateToProps = state => ({
  isMobile: state.app.isMobile
});

export default connect(mapStateToProps)(Footer);
