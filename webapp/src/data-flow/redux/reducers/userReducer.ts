/* eslint-disable no-case-declarations */
import { SET_USER, UPDATE_USER_DATA } from '../actions/userAction';
import { auth } from '../../../pages/login/Auth';

/**
 * @param action {object}
 */
export default (state = { user: {} }, action: any) => {
  switch (action.type) {
  case SET_USER:
    return Object.assign({}, state, {
      user: action.payload
    });
  case UPDATE_USER_DATA:
    const currentUser = Object.assign({}, state.user);
    const userRef = auth.userRef(state.user);

    userRef.update(action.payload);

    for (let prop in action.payload) {
      // @ts-ignore
      currentUser[prop] = action.payload[prop];
    }

    return Object.assign({}, state, {
      user: currentUser
    });
  default:
    return state;
  }
};
