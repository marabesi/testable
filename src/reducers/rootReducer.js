import { combineReducers } from 'redux';
import guideReducer from './guideReducer';
import userReducer from './userReducer';

export default combineReducers({
  guideReducer,
  userReducer
});