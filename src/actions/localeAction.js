export const SET_LOCALE = 'SET_LOCALE';

/**
 * @param {any} payload 
 */
export function setLocale(payload) {
  return { type: SET_LOCALE, payload };
}
