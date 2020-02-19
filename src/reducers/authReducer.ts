import { SET_CURRENT_USER, GET_ERRORS } from "../actions/types";

export const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

// ===REDUCERS===
export default function(state = initialState, action: any) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
}

// ===UTILS===
const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
