//@ts-nocheck
export const ON_HOVER = 'ON_HOVER';

export function onHover(payload) {
  return { type: ON_HOVER, payload };
}