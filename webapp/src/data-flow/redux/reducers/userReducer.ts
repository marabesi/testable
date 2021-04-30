import { REMOVE_USER, SET_USER, UPDATE_USER_DATA } from '../actions/userAction';
import { auth } from '../../../pages/login/Auth';
import { User } from '../../../packages/types/User';

interface UserState {
  user?: User | {}
}

export default (state: UserState = { user: {}}, action: any) => {
  switch (action.type) {
  case SET_USER:
    return Object.assign({}, state, {
      user: action.payload
    });
  case REMOVE_USER:
    return Object.assign({}, state, {
      user: {}
    });
  case UPDATE_USER_DATA:
    const currentUser: User | {} | undefined = Object.assign({}, state.user);
    const userRef: any = auth.userRef(state.user);

    userRef.update(action.payload);

    for (const prop in action.payload) {
      currentUser[prop] = action.payload[prop];
    }

    return Object.assign({}, state, {
      user: currentUser
    });
  default:
    return state;
  }
};