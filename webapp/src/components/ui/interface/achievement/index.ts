import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import AchievementContainer from './AchievementContainer';

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const connector = connect(mapStateToProps);

export default injectIntl(connector(AchievementContainer));