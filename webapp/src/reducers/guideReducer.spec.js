import guideReducer from './guideReducer';
import { ON_HOVER } from '../actions/guideAction';

describe('guide reducer', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  afterEach(() => {
    state = {};
  });

  test('dispatch ON_HOVER action', () => {
    const action = {
      type: ON_HOVER,
      payload: true
    };

    const dispatch = guideReducer(state, action);

    expect(dispatch.hovered).toBe(true);
  });

  test('no action type match should return current state', () => {
    const dispatch = guideReducer(state, {});

    expect(dispatch).toBe(state);
  });
});
