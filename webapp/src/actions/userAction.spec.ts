import { setUser } from './userAction';

describe('user actions', () => {

  const action = setUser({});

  test('define setUser action', () => {
    expect(action.type).toEqual('SET_USER');
    expect(action.payload).toEqual({});
  });
});
