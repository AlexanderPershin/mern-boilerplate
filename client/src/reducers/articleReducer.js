import { FETCH_ARTICLE, CLEAR_ARTICLE } from '../actions/types';

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLE:
      return action.payload;
    case CLEAR_ARTICLE:
      return null;
    default:
      return state;
  }
}
