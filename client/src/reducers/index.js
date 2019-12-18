import { combineReducers } from 'redux';

import authReducer from './authReducer';
import articlesReducer from './articlesReducer';
import currentArticlesReducer from './currentArticlesReducer';
import articleReducer from './articleReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  currentArticles: currentArticlesReducer,
  article: articleReducer,
  errors: errorReducer
});
