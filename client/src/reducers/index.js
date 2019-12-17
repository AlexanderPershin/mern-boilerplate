import { combineReducers } from 'redux';

import authReducer from './authReducer';
import articlesReducer from './articlesReducer';
import articleReducer from './articleReducer';

export default combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  article: articleReducer
});
