import {
  SET_ERRORS,
  SET_AUTHENTICATED,
  RESET_AUTHORIZATION,
  RESET_ALL_STATE,
  IS_EMPLOYER,
} from "./types";
import setAuthToken from "../utils/setAuthToken.js";
import axios from "axios";
export const signin = (userData) => (dispatch) => {
  axios
    .post("/signin", userData)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("userName", response.data.username);
        localStorage.setItem("token", response.data.token);
        setAuthToken(localStorage.getItem("token"));
        dispatch({
          type: SET_AUTHENTICATED,
          payload: false,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data.responseMsg,
        });
      }
    });
};

export const register = (userData) => (dispatch) => {
  axios
    .post("/register", userData)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("userName", response.data.username);
        localStorage.setItem("token", response.data.token);
        setAuthToken(localStorage.getItem("token"));
        dispatch({
          type: SET_AUTHENTICATED,
          payload: true,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data.responseMsg,
        });
      }
    });
};

export const resetAuthorization = (errorMessage) => (dispatch) => {
  localStorage.removeItem("userName");
  localStorage.removeItem("token");
  dispatch({
    type: RESET_AUTHORIZATION,
    error: errorMessage,
    isAuthenticated: false,
  });
  dispatch({
    type: RESET_ALL_STATE,
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userName");
  localStorage.removeItem("token");
  localStorage.removeItem("state");
  dispatch({
    type: RESET_ALL_STATE,
  });
  setAuthToken(null);
};

export const setError = (errorMessage) => (dispatch) => {
  dispatch({
    type: SET_ERRORS,
    payload: errorMessage,
  });
};
export const isEmployer = (value) => (dispatch) => {
  dispatch({
    type: IS_EMPLOYER,
    payload: value,
  });
};

export const employerlogin = (employerData) => (dispatch) => {
  axios
    .post("/employerlogin", employerData)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("userName", response.data.username);
        localStorage.setItem("token", response.data.token);
        setAuthToken(localStorage.getItem("token"));
        dispatch({
          type: SET_AUTHENTICATED,
          payload: false,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data.responseMsg,
        });
      }
    });
};
export const registeremployer = (employerData) => (dispatch) => {
  axios
    .post("/registeremployer", employerData)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("userName", response.data.username);
        localStorage.setItem("token", response.data.token);
        setAuthToken(localStorage.getItem("token"));
        dispatch({
          type: SET_AUTHENTICATED,
          payload: true,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data.responseMsg,
        });
      }
    });
};
