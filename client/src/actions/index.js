import axios from 'axios';
import {
  FETCH_USER,
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  CLEAR_ARTICLE
} from './types';

export const fetchUser = () => async dispatch => {
  const user = await axios.get('/api/current_user');
  if (user.data) {
    dispatch({ type: FETCH_USER, payload: user.data });
  } else {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

export const fetchArticles = (skip, amount) => async dispatch => {
  // '/api/articles/:skip/:amount'
  const result = await axios.get(`/api/articles/${skip}/${amount}`);

  if (result.data.articles.length > 0) {
    dispatch({ type: FETCH_ARTICLES, payload: result.data.articles });
  } else {
    dispatch({ type: FETCH_ARTICLES, payload: [] });
  }
};

export const fetchArticle = id => async dispatch => {
  const result = await axios.get(`/api/article/${id}`);

  if (result.data.article) {
    dispatch({ type: FETCH_ARTICLE, payload: result.data.article });
  } else {
    dispatch({ type: FETCH_ARTICLE, payload: null });
  }
};

export const clearArticle = () => {
  return {
    type: CLEAR_ARTICLE
  };
};
