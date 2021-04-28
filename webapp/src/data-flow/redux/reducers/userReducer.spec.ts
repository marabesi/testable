import userReducer from './userReducer';
import { removeUser, SET_USER, updateUser } from '../actions/userAction';

jest.mock('../../../pages/login/Auth', () => ({
  auth: {
    userRef: function () {
      return {
        update: function () {
          return
        }
      }
    }
  }
}));

describe('user reducer', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  afterEach(() => {
    state = {};
  });

  test('dispatch SET_USER action', () => {
    const action = {
      type: SET_USER,
      payload: {
        name: 'myuser'
      }
    };

    const dispatch = userReducer(state, action);

    expect(dispatch.user).toBe(action.payload);
  });

  test('no action type match should return current state', () => {
    const dispatch = userReducer(state, {});

    expect(dispatch).toBe(state);
  });

  test.each([
    [{}, { name: 'updated user name' }],
    [{ name: 'john'}, { name: 'maria' }],
    [{ name: 'john'}, { name: 'maria', email: 'maria@maria.com' }],
  ])('update user %s', (currentUserData, payload) => {
    const updateAction = updateUser(payload);
    const dispatch = userReducer({ user :currentUserData }, updateAction);

    expect(dispatch.user).toStrictEqual(payload);
  })

  test('delete user', () => {
    const removeUserAction = removeUser({});
    const dispatch = userReducer({ user : { name: 'diego' }}, removeUserAction);

    expect(dispatch.user).toStrictEqual({});
  })
});
