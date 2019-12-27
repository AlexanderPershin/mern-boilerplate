import { SET_PROFILE, UPDATE_PROFILE } from '../actions/types';

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload;
    case UPDATE_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
