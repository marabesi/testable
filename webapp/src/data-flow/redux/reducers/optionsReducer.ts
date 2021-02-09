import { ON_OPTIONS_UPDATED } from '../actions/optionsAction';

const defaultState = () => {
  return JSON.parse(window.localStorage.getItem('options') || '{ "animation": true }');
};

/**
 * @param action {object}
 */
export default (state = { options: defaultState()}, action: any) => {
  switch (action.type) {
  case ON_OPTIONS_UPDATED:
    return Object.assign({}, state, {
      options: action.payload
    });
  default:
    return state;
  }
};
