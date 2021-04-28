import { REMOVE_USER, SET_USER, UPDATE_USER_DATA } from '../actions/userAction';
import { auth } from '../../../pages/login/Auth';

export default (state = { user: {} }, action: any) => {
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
      const currentUser = Object.assign({}, state.user);
      const userRef = auth.userRef(state.user);

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
