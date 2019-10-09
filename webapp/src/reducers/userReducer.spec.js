import userReducer from './userReducer';
import { SET_USER } from '../actions/userAction';

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
});
