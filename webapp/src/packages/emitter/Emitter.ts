const {EventEmitter} = require('fbemitter');
const Emitter = new EventEmitter();

export const TRACKING = '0';

export const LEVEL_UP = '1';
export const LEVEL_DOWN = '4';

export const PROGRESS_UP = '2';
export const PROGRESS_DOWN = '3';

export default Emitter;