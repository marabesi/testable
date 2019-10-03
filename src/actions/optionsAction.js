export const ON_OPTIONS_UPDATED = 'ON_OPTIONS_UPDATED';

/**
 * @param {any} payload
 */
export function setUpdateOptions(payload) {
  return { type: ON_OPTIONS_UPDATED, payload };
}
