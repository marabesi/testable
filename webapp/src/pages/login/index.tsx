import { connect } from 'react-redux';
import { Login } from './Login';
import { User } from '../../packages/types/User';
import { setUser } from '../../data-flow/redux/actions/userAction';

interface State {
  userReducer: { user: User; };
  localeReducer: { locale: string };
}
export const mapStateToProps = (state: State) => ({
  user: state.userReducer.user,
  locale: state.localeReducer.locale,
});

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
  return {
    setUser: (user: any) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
