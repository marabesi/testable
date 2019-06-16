import Emitter, { TRACKING } from './Emitter';

export function track(data) {
  const wrapper = {
    ...data,
    timestamp: Date.now()
  };
  Emitter.emit(TRACKING, wrapper);
}