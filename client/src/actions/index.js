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
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  COMMENT_ARTICLE,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_ALERT,
  REMOVE_ALERT,
  SET_PROFILE,
  DELETE_PROFILE,
  UPDATE_PROFILE,
  SET_PROFILES
} from './types';

export const fetchUser = () => async dispatch => {
  const user = await axios.get('/api/current_user');
  if (user.data) {
    dispatch({ type: FETCH_USER, payload: user.data });
  } else {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

export const getProfile = () => async dispatch => {
  const profile = await axios.get('/api/profiles/current');

  if (profile.data.success) {
    dispatch({
      type: SET_PROFILE,
      payload: profile.data.profile
    });
  }
};

export const updateProfile = (profileData, socialData) => async dispatch => {
  const response = await axios.post('/api/profiles/current', {
    ...profileData,
    socials: { ...socialData }
  });

  if (response.data.success) {
    const updatedProfile = response.data.profile;
    dispatch({
      type: UPDATE_PROFILE,
      payload: updatedProfile
    });
  }
};

export const deleteProfile = () => async dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete your account? Operation is irreversible!'
    )
  ) {
    const response = await axios.delete('/api/profiles');

    if (response.data.success) {
      setAlert('Profile deleted', 'successs', 5000);
    } else {
      setAlert('Error deleting profile', 'danger', 5000);
    }
  }
};

export const fetchArticles = (skip, amount, sort = -1) => async dispatch => {
  // TODO: refactor code to request only absent articles
  // and add them in the reducer to previously loaded articles
  // '/api/articles/:skip/:amount/:sort'
  const result = await axios.get(`/api/articles/${skip}/${amount}/${sort}`);

  if (result.data.articles.length > 0) {
    dispatch({ type: FETCH_ARTICLES, payload: result.data.articles });
  } else {
    dispatch({ type: FETCH_ARTICLES, payload: [] });

    dispatch(dispatch(setAlert('Error fetching articles', 'warning', 5000)));
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

    dispatch(setAlert(`Error fetching articles of a current user!`, 'warning'));
  }
};

export const fetchArticle = id => async dispatch => {
  const result = await axios.get(`/api/article/${id}`);

  if (result.data.article) {
    dispatch({ type: FETCH_ARTICLE, payload: result.data.article });
  } else {
    dispatch({ type: FETCH_ARTICLE, payload: null });

    dispatch(setAlert(`Error fetching article!`, 'warning'));
  }
};

export const newArticle = article => async dispatch => {
  const result = await axios.post('/api/articles', article);

  const { success, msg } = result.data;

  if (success) {
    dispatch({ type: NEW_ARTICLE, payload: article });
    dispatch(setAlert(`You've posted an article`, 'success', 2000));
  } else {
    dispatch(setAlert(`Error creating article! Message: ${msg}`, 'warning'));
  }
};

export const likeArticle = (id, userId) => async dispatch => {
  const result = await axios.post(`/api/articles/like/${id}`);

  const { success, msg } = result.data;

  if (success) {
    dispatch({ type: LIKE_ARTICLE, payload: { id, userId } });
    dispatch(setAlert(`Like accepted`, 'success', 1000));
  } else {
    dispatch(setAlert(`Liking error: ${msg}`, 'warning'));
  }
};

export const dislikeArticle = (id, userId) => async dispatch => {
  const result = await axios.post(`/api/articles/dislike/${id}`);

  const { success, msg } = result.data;

  if (success) {
    dispatch({ type: DISLIKE_ARTICLE, payload: { id, userId } });
    dispatch(setAlert(`Dislike accepted`, 'success', 1000));
  } else {
    dispatch(setAlert(`Disliking error: ${msg}`, 'warning'));
  }
};

export const deleteArticle = id => async dispatch => {
  const res = await axios.post(`/api/articles/delete/${id}`);

  if (res) {
    dispatch({ type: DELETE_ARTICLE, payload: { id } });
    dispatch(setAlert(`You've deleted an article`, 'success', 2000));
  } else {
    dispatch(setAlert(`Error deleting article!`, 'warning'));
  }
};

export const clearArticle = () => {
  return {
    type: CLEAR_ARTICLE
  };
};

export const commentArticle = (id, user, text) => async dispatch => {
  const result = await axios.post(`/api/articles/comment/${id}`, {
    body: text
  });

  const { success, msg, _id } = result.data;

  if (success) {
    dispatch({ type: COMMENT_ARTICLE, payload: { user, body: text, _id } });
  } else {
    dispatch(setAlert(`Server error commenting article`, 'warning'));
  }
};

export const deleteCommentArticle = (id, comment_id) => async dispatch => {
  const result = await axios.delete(
    `/api/articles/comment/${id}/${comment_id}`
  );
  console.log('TCL: result', result.data);

  const { success, msg, comments } = result.data;

  if (success) {
    dispatch({ type: DELETE_COMMENT, payload: comments });
  } else {
    dispatch(setAlert(`Server error commenting article ${msg}`, 'warning'));
  }
};

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv1();

  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      alertType
    }
  });

  // Set alert timeout to infinite to constantly show alert
  // until user will press cross button
  if (timeout !== 'infinite') {
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  }
};

export const deleteAlert = id => dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id
  });
};

export const getProfiles = () => async dispatch => {
  const result = await axios.get('/api/profiles/all');
  if (result.data && result.data.length > 0) {
    dispatch({ type: SET_PROFILES, payload: result.data });
  }
};
