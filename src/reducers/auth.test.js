import { SET_CURRENT_USER, GET_ERRORS, SET_ERRORS } from "../actions/types";
import authReducer, { initialState } from "./auth";

describe("Auth Reducer", () => {
  it("should return default state", () => {
    const newState = authReducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it("should return new user state", () => {
    const user = { name: "King" };
    const action = {
      type: SET_CURRENT_USER,
      payload: user,
    };

    const newState = authReducer(undefined, action);
    expect(newState).toEqual({
      isAuthenticated: true,
      user,
      errors: {},
    });
  });

  it("should return error state", () => {
    const errors = { password: "Password is incorrect" };
    const action = {
      type: SET_ERRORS,
      payload: errors,
    };

    const newState = authReducer(undefined, action);
    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      errors,
    });
  });
});
