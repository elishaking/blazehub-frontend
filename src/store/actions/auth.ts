import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_ERRORS, SET_CURRENT_USER, SET_AUTH } from "./types";
import { UserSigninData, UserSignupData } from "../../models/user";
import { logError } from "../../utils/logError";
import { AuthUser, AuthState } from "../../models/auth";

interface UserSigninResponse {
  accessToken: string;
  user: AuthUser;
}

// ===ACTIONS===
export const setAuth = (authState: AuthState) => ({
  type: SET_AUTH,
  payload: authState,
});

export const setErrors = (errorData: any) => ({
  type: SET_ERRORS,
  payload: errorData,
});

export const setCurrentUser = (userData: any) => ({
  type: SET_CURRENT_USER,
  payload: userData,
});

// ===ACTION CREATORS===

// @action-type SET_ERRORS
// @description sign-up user
export const signupUser = (userData: UserSignupData, history: any) => async (
  dispatch: any
) => {
  await axios
    .post("/auth/signup", userData)
    .then((res) => history.push("/signin"))
    .catch((err) => {
      logError(err.response);
      const errors = {
        status: err.response.status,
        data:
          typeof err.response.data === "object" ? err.response.data : undefined,
      };
      if (err.response) dispatch(setErrors(errors));
    });
};

// @action-types SET_CURRENT_USER, SET_ERRORS
// @description sign-in/authenticate user
export const signinUser = (userData: UserSigninData) => (dispatch: any) => {
  axios
    .post("/auth/signin", userData)
    .then((res) => {
      // save token to localStorage to enable global access
      const { accessToken }: UserSigninResponse = res.data;
      localStorage.setItem("jwtToken", accessToken);

      // add token to axios Authorization Header
      setAuthToken(accessToken);

      // get user data from jwt-token
      const decodedUserData: any = jwt_decode(accessToken);

      dispatch(
        setAuth({
          isAuthenticated: true,
          user: decodedUserData,
          errors: undefined,
        })
      );
      window.location.href = "/home";
    })
    .catch((err) => {
      logError(err);
      if (err.response) dispatch(setErrors(err.response.data));
    });
};

// @action-type SET_CURRENT_USER
// @description sign-in/authenticate user
export const signoutUser = () => (dispatch: any) => {
  localStorage.removeItem("jwtToken");
  setAuthToken("");
  dispatch(
    setAuth({
      isAuthenticated: false,
      user: {} as AuthUser,
      errors: undefined,
    })
  );
};

// ===UTILS===
// adds/deletes @token from the Authorization Header
export const setAuthToken = (token: string) => {
  if (token) {
    // Apply token to every request
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    // Delete Auth Header
    delete axios.defaults.headers.common.Authorization;
  }
};

export const verifyConfirmToken = (token: string) => {
  return axios.post("/auth/confirm", {
    token,
  });
};

export const resendConfirmationUrl = (email: string) => {
  return axios.post("/auth/confirm/resend", {
    email,
  });
};

export const sendPasswordResetUrl = (email: string) => {
  return axios.post("/auth/password/forgot", {
    email,
  });
};

export const confirmPasswordResetUrl = (token: string) => {
  console.log("");
  return axios.post("/auth/password/confirm", {
    token,
  });
};
export const resetPassword = (token: string, password: string) => {
  return axios.post("/auth/password/reset", {
    token,
    password,
  });
};
