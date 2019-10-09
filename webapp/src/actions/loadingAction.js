export const ON_LOADING = 'ON_LOADING';

/**
 * @param {any} payload 
 */
export function onLoading(payload) {
  return { type: ON_LOADING, payload };
}