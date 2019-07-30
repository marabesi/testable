import { combineReducers } from 'redux';
import guideReducer from './guideReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  guideReducer,
  userReducer,
  loadingReducer
});