export const SET_USER = 'SET_USER';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const REMOVE_USER = 'REMOVE_USER';

/**
 * @param {any} payload 
 */
export function setUser(payload) {
  return { type: SET_USER, payload };
}

export function removeUser(payload) {
  return { type: REMOVE_USER, payload };
}

export function updateUser(payload) {
  return { type: UPDATE_USER_DATA, payload };
}
