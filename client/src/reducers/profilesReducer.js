import { SET_PROFILES } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILES:
      return action.payload;
    default:
      return state;
  }
}
