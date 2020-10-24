export const ON_EDITOR_ERROR = 'ON_EDITOR_ERROR';
export const ON_EDITOR_VALID_CODE = 'ON_EDITOR_VALID_CODE';

export function onEditorError(payload) {
  return { type: ON_EDITOR_ERROR, payload };
}

export function onEditorValidCode(payload) {
  return { type: ON_EDITOR_VALID_CODE, payload };
}