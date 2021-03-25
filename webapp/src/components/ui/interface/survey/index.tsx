import { connect } from 'react-redux';
import { Survey } from './Survey';

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Survey);
