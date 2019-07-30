import { ON_LOADING } from '../actions/loadingAction';

/**
 * @param action {object}
 */
export default (state = { loading: true }, action) => {
  switch (action.type) {
  case ON_LOADING:
    return Object.assign({}, state, {
      loading: action.payload
    });
  default:
    return state;
  }
};
