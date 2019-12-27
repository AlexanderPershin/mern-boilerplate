import { FETCH_ARTICLES, LOADMORE_ARTICLES } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return action.payload;
    case LOADMORE_ARTICLES:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
