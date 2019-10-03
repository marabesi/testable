import { ON_OPTIONS_UPDATED } from '../actions/optionsAction';
/**
 * @param action {object}
 */
export default (state = { options: { animation: true }}, action) => {
  switch (action.type) {
  case ON_OPTIONS_UPDATED:
    return Object.assign({}, state, {
      options: action.payload
    });
  default:
    return state;
  }
};
