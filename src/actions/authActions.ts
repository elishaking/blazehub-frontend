import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// ===ACTIONS===

export const getErrors = (errorData: any) => ({
  type: GET_ERRORS,
  payload: errorData
});

export const setCurrentUser = (userData: any) => ({
  type: SET_CURRENT_USER,
  payload: userData
});

// ===ACTION CREATORS===

// @action-type GET_ERRORS
// @description sign-up user
export const signupUser = (userData: any, history: any) => async (
  dispatch: any
) => {
  await axios
    .post("/api/users/signup", userData)
    .then(res => history.push("/signin"))
    .catch(err => {
      if (err.response) dispatch(getErrors(err.response.data));
    });
};

// @action-types SET_CURRENT_USER, GET_ERRORS
// @description sign-in/authenticate user
export const signinUser = (userData: any) => (dispatch: any) => {
  axios
    .post("/api/users/signin", userData)
    .then(res => {
      // save token to localStorage to enable global access
      const token = res.data.data;
      localStorage.setItem("jwtToken", token);

      // add token to axios Authorization Header
      setAuthToken(token);

      // get user data from jwt-token
      const decodedUserData = jwt_decode(token);

      dispatch(setCurrentUser(decodedUserData));
      // window.location.href = "/home";
    })
    .catch(err => {
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
