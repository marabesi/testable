import { onHover } from './guideAction';

describe('guide actions', () => {

  const action = onHover({});
  
  test('define onHover action', () => {
    expect(action.type).toEqual('ON_HOVER');
    expect(action.payload).toEqual({});
  });
});
