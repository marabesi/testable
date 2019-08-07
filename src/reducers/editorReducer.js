/**
 * @param action {object}
 */
export default (state = {}, action) => {
  switch (action.type) {
  case 'ON_EDITOR_ERROR':
    return Object.assign({}, state, {
      editorError: action.payload
    });
  default:
    return state;
  }
};
