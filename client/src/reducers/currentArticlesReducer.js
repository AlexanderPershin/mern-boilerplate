import { FETCH_CURRENT_ARTICLES } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_ARTICLES:
      return action.payload;
    default:
      return state;
  }
}
