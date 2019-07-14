/**
 * @param action {object}
 */
export default (state = {}, action) => {
  switch (action.type) {
  case 'ON_LOADING':
    return Object.assign({}, state, {
      loading: action.payload
    });
  default:
    return state;
  }
};
