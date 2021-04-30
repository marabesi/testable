import loadingReducer from './loadingReducer';
import { onLoading } from '../actions/loadingAction';

describe('loading reducer', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  afterEach(() => {
    state = {};
  });

  test('dispatch ON_LOADING action', () => {
    const action = onLoading(true);

    const dispatch = loadingReducer(state, action);

    expect(dispatch.loading).toBe(true);
  });

  test('no action type match should return current state', () => {
    const dispatch = loadingReducer(state, {});

    expect(dispatch).toBe(state);
  });
});
