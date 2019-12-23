import { NEW_ERROR, DELETE_ERROR, CLEAR_ERRORS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_ERROR: {
      alert(action.payload.message);
      return [...state, action.payload];
    }
    case DELETE_ERROR: {
      return state.filter(item => item.errorId !== action.payload.errorId);
    }
    case CLEAR_ERRORS: {
      return [];
    }
    default:
      return state;
  }
}
