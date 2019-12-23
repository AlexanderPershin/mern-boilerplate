import {
  FETCH_ARTICLE,
  CLEAR_ARTICLE,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE
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
    case CLEAR_ARTICLE:
      return null;
    default:
      return state;
  }
}
