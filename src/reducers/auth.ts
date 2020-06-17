import { SET_CURRENT_USER, SET_ERRORS, SET_AUTH } from "../actions/types";
import { AuthState, AuthUser, AuthErrors } from "../models/auth";

export const initialState: AuthState = {
  isAuthenticated: false,
  user: {} as AuthUser,
  errors: {} as AuthErrors,
};

// ===REDUCERS===
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
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
