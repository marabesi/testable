export default {
  env: process.env.NODE_ENV,
  isDebug: process.env.REACT_APP_DEBUG === 'true' || false,
  publicUrl: process.env.PUBLIC_URL || '',
  basename: process.env.REACT_APP_BASE_NAME || '/',
  rankingApi: process.env.REACT_APP_RANKING_API || '',
  host: process.env.REACT_APP_HOST || window.location.origin,
  surveyUrl: process.env.REACT_APP_SURVEY_URL || '',
  showSurvey: process.env.REACT_APP_SHOW_SURVEY === 'true' || false,
  firebaseJson: process.env.REACT_APP_FIREBASE_JSON || '',
  firebaseTosUrl: process.env.REACT_APP_TOS_URL || '',
  firebasePrivacyUrl: process.env.REACT_APP_PRIVACY_URL || '',
};

export const DEVELOPMENT_MODE = 'development';
export const PRODUCTION_MODE = 'production';
export const TEST_MODE = 'test';