import axios from 'axios';
import uuidv1 from 'uuid/v1';
import {
  FETCH_USER,
  FETCH_ARTICLES,
  FETCH_CURRENT_ARTICLES,
  FETCH_ARTICLE,
  NEW_ARTICLE,
  DELETE_ARTICLE,
  CLEAR_ARTICLE,
  NEW_ERROR,
  DELETE_ERROR,
  CLEAR_ERRORS,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE
} from './types';

export const fetchUser = () => async dispatch => {
  const user = await axios.get('/api/current_user');
  if (user.data) {
    dispatch({ type: FETCH_USER, payload: user.data });
  } else {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

export const fetchArticles = (skip, amount, sort = -1) => async dispatch => {
  // '/api/articles/:skip/:amount/:sort'
  const result = await axios.get(`/api/articles/${skip}/${amount}/${sort}`);

  if (result.data.articles.length > 0) {
    dispatch({ type: FETCH_ARTICLES, payload: result.data.articles });
  } else {
    dispatch({ type: FETCH_ARTICLES, payload: [] });

    dispatch(newError(`Error fetching articles!`));
  }
};

export const fetchCurrentArticles = (skip, amount, sort) => async dispatch => {
  // '/api/articles/:skip/:amount/:sort'
  // sort = -1 - last published articles, sort = 1 - oldest articles
  const result = await axios.get(
    `/api/current_articles/${skip}/${amount}/${sort}`
  );

  if (
    result.data.articles &&
    result.data.articles.length &&
    result.data.articles.length > 0
  ) {
    dispatch({ type: FETCH_CURRENT_ARTICLES, payload: result.data.articles });
  } else {
    dispatch({ type: FETCH_CURRENT_ARTICLES, payload: [] });

    dispatch(newError(`Error fetching articles of a current user!`));
  }
};

export const fetchArticle = id => async dispatch => {
  const result = await axios.get(`/api/article/${id}`);

  if (result.data.article) {
    dispatch({ type: FETCH_ARTICLE, payload: result.data.article });
  } else {
    dispatch({ type: FETCH_ARTICLE, payload: null });

    dispatch(newError(`Error fetching article!`));
  }
};

export const newArticle = article => async dispatch => {
  const result = await axios.post('/api/articles', article);

  const { success, msg } = result.data;

  if (success) {
    dispatch({ type: NEW_ARTICLE, payload: article });
  } else {
    dispatch(newError(`Error creating article! Message: ${msg}`));
  }
};

export const likeArticle = (id, userId) => async dispatch => {
  const result = await axios.post(`/api/articles/like/${id}`);

  const { success, msg } = result.data;

  if (success) {
    dispatch({ type: LIKE_ARTICLE, payload: { id, userId } });
  } else {
    dispatch(newError(`Liking error: ${msg}`));
  }
};

export const dislikeArticle = (id, userId) => async dispatch => {
  const result = await axios.post(`/api/articles/dislike/${id}`);

  const { success, msg } = result.data;

  if (success) {
    dispatch({ type: DISLIKE_ARTICLE, payload: { id, userId } });
  } else {
    dispatch(newError(`Unliking error: ${msg}`));
  }
};

export const deleteArticle = id => async dispatch => {
  const res = await axios.post(`/api/articles/delete/${id}`);

  if (res) {
    dispatch({ type: DELETE_ARTICLE, payload: { id } });
  } else {
    dispatch(newError(`Error deleting article!`));
  }
};

export const clearArticle = () => {
  return {
    type: CLEAR_ARTICLE
  };
};

export const newError = msg => {
  return {
    type: NEW_ERROR,
    payload: {
      errorId: uuidv1(),
      message: msg
    }
  };
};

export const deleteError = errorId => {
  return {
    type: DELETE_ERROR,
    payload: {
      errorId
    }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
