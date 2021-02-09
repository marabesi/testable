//@ts-nocheck
export const ON_OPTIONS_UPDATED = 'ON_OPTIONS_UPDATED';

export function setUpdateOptions(payload) {
  window.localStorage.setItem('options', JSON.stringify(payload));
  return { type: ON_OPTIONS_UPDATED, payload };
}
