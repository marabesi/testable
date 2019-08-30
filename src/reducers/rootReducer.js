import { combineReducers } from 'redux';
import guideReducer from './guideReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import editorReducer from './editorReducer';
import localeReducer from './localeReducer';

export default combineReducers({
  guideReducer,
  userReducer,
  loadingReducer,
  editorReducer,
  localeReducer,
});
