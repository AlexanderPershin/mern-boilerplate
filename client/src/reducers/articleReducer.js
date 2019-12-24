import {
  FETCH_ARTICLE,
  CLEAR_ARTICLE,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  COMMENT_ARTICLE,
  DELETE_COMMENT
} from '../actions/types';

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLE:
      return action.payload;
    case LIKE_ARTICLE: {
      const newState = { ...state };
      newState.dislikes = newState.dislikes.filter(
        item => item !== action.payload.userId
      );
      newState.likes = newState.likes.filter(
        item => item !== action.payload.userId
      );
      newState.likes.unshift(action.payload.userId);
      return newState;
    }
    case DISLIKE_ARTICLE: {
      const newState = { ...state };
      newState.dislikes = newState.dislikes.filter(
        item => item !== action.payload.userId
      );
      newState.likes = newState.likes.filter(
        item => item !== action.payload.userId
      );
      newState.dislikes.unshift(action.payload.userId);
      return newState;
    }
    case COMMENT_ARTICLE: {
      const newState = { ...state };
      newState.comments.unshift({
        ...action.payload,
        date: new Date(Date.now()).toISOString()
      });
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = { ...state };
      newState.comments = action.payload;
      return newState;
    }
    case CLEAR_ARTICLE:
      return null;
    default:
      return state;
  }
}
