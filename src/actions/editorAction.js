export const ON_EDITOR_ERROR = 'ON_EDITOR_ERROR';

/**
 * @param {any} payload
 */
export function onEditorError(payload) {
  return { type: ON_EDITOR_ERROR, payload };
}