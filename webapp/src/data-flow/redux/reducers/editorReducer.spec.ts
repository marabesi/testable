import editorReducer from './editorReducer';
import { ON_EDITOR_ERROR } from '../actions/editorAction';

describe('editor reducer', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  afterEach(() => {
    state = {};
  });

  test('dispatch ON_EDITOR_ERROR action', () => {
    const action = {
      type: ON_EDITOR_ERROR,
      payload: true
    };

    const dispatch = editorReducer(state, action);

    expect(dispatch.editorError).toBe(true);
  });

  test('no action type match should return current state', () => {
    const dispatch = editorReducer(state, {});

    expect(dispatch).toBe(state);
  });
});
