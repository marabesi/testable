const SET_USER = 'SET_USER';

/**
 * @param {any} payload 
 */
export function setUser(payload) {
  return { type: SET_USER, payload };
}
