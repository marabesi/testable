export default (state = {}, action) => {
  switch (action.type) {
  case 'ON_HOVER':
    return Object.assign({}, state, {
      hovered: action.payload
    });
  default:
    return state;
  }
};
