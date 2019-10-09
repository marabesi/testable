export const ON_HOVER = 'ON_HOVER';

/**
 * @param {any} payload 
 */
export function onHover(payload) {
  return { type: ON_HOVER, payload };
}