import { onEditorError } from './editorAction';

describe('editor actions', () => {

  const action = onEditorError({});

  test('define onEditorError action', () => {
    expect(action.type).toEqual('ON_EDITOR_ERROR');
    expect(action.payload).toEqual({});
  });
});
