import { combineReducers } from 'redux';

import authReducer from './authReducer';
import articlesReducer from './articlesReducer';
import currentArticlesReducer from './currentArticlesReducer';
import articleReducer from './articleReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';
import profilesReducer from './profilesReducer';

export default combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  currentArticles: currentArticlesReducer,
  article: articleReducer,
  alerts: alertReducer,
  profile: profileReducer,
  profiles: profilesReducer
});
