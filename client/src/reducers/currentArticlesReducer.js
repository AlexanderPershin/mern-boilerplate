import {
  FETCH_CURRENT_ARTICLES,
  DELETE_ARTICLE,
  NEW_ARTICLE,
  LOADMORE_CURRENT_ARTICLES
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_ARTICLES:
      return action.payload;
    case LOADMORE_CURRENT_ARTICLES:
      return [...state, ...action.payload];
    case NEW_ARTICLE: {
      return state.unshift(action.payload);
    }
    case DELETE_ARTICLE: {
      return state.filter(item => item._id !== action.payload.id);
    }
    default:
      return state;
  }
}
