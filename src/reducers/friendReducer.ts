import { SET_FRIENDS, ADD_FRIEND } from "../actions/types";

const initialState = {};

// ===REDUCERS===
export default function(state = initialState, action: any) {
  switch (action.type) {
    case SET_FRIENDS:
      return {
        ...state,
        ...action.payload
      };

    case ADD_FRIEND:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
