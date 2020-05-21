import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { UserSigninData, UserSignupData } from "../models/user";
import logError from "../utils/logError";

// ===ACTIONS===

export const getErrors = (errorData: any) => ({
  type: GET_ERRORS,
  payload: errorData,
});

export const setCurrentUser = (userData: any) => ({
  type: SET_CURRENT_USER,
  payload: userData,
});

// ===ACTION CREATORS===

// @action-type GET_ERRORS
// @description sign-up user
export const signupUser = (userData: UserSignupData, history: any) => async (
  dispatch: any
) => {
  await axios
    .post("/api/users/signup", userData)
    .then((res) => history.push("/signin"))
    .catch((err) => {
      logError(err);
      if (err.response) dispatch(getErrors(err.response.data));
    });
};

// @action-types SET_CURRENT_USER, GET_ERRORS
// @description sign-in/authenticate user
export const signinUser = (userData: UserSigninData) => (dispatch: any) => {
  axios
    .post("/api/users/signin", userData)
    .then((res) => {
      // save token to localStorage to enable global access
      const token: string = res.data.data;
      localStorage.setItem("jwtToken", token);

      // add token to axios Authorization Header
      setAuthToken(token);

      // get user data from jwt-token
      const decodedUserData = jwt_decode(token);

      dispatch(setCurrentUser(decodedUserData));
      // window.location.href = "/home";
    })
    .catch((err) => {
      logError(err);
      if (err.response) dispatch(getErrors(err.response.data));
    });
};

// @action-type SET_CURRENT_USER
// @description sign-in/authenticate user
export const signoutUser = () => (dispatch: any) => {
  localStorage.removeItem("jwtToken");
  setAuthToken("");
  dispatch(setCurrentUser({}));
};

// ===UTILS===
// adds/deletes @token from the Authorization Header
export const setAuthToken = (token: string) => {
  if (token) {
    // Apply token to every request
    axios.defaults.headers.common.Authorization = token;
  } else {
    // Delete Auth Header
    delete axios.defaults.headers.common.Authorization;
  }
};

export const verifyConfirmToken = (token: string) => {
  return axios.post("/api/users/confirm", {
    token,
  });
};
