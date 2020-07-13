import {
  ADD_POST,
  POST_REPLY,
  CURRENT_POST,
  FETCH_POSTS,
  SEARCH_POSTS,
  SET_ERRORS,
  RESET_ERRORS,
  RESET_AUTHORIZATION,
  RESET_ALL_STATE,
} from "./types";
import axios from "axios";
export const setcurrentpost = (post) => (dispatch) => {
  dispatch({
    type: CURRENT_POST,
    payload: post,
  });
};
export const addpost = (postData) => (dispatch) => {
  axios
    .post("/addpost", postData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: ADD_POST,
          payload: res.data.post,
        });
        dispatch({
          type: RESET_ERRORS,
        });
      }
    })
    .catch((err) => {
      if (err.response.data) {
        if (err.response.data.authenticated !== undefined) {
          dispatch({
            type: RESET_AUTHORIZATION,
            error: err.response.data.responseMsg,
            isAuthenticated: err.response.data.authenticated,
          });
          dispatch({
            type: RESET_ALL_STATE,
          });
        }
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data.responseMsg,
        });
      }
    });
};
export const postreply = (replyData) => (dispatch) => {
  axios
    .put("/replypost", replyData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: POST_REPLY,
          payload: res.data.post,
        });
        dispatch({
          type: RESET_ERRORS,
        });
      }
    })
    .catch((err) => {
      if (err.response.data) {
        if (err.response.data.authenticated !== undefined) {
          dispatch({
            type: RESET_AUTHORIZATION,
            error: err.response.data.responseMsg,
            isAuthenticated: err.response.data.authenticated,
          });
          dispatch({
            type: RESET_ALL_STATE,
          });
        }
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data.responseMsg,
        });
      }
    });
};

export const fetchPosts = () => (dispatch) => {
  axios
    .get("/posts")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: FETCH_POSTS,
          payload: res.data.posts,
        });
        dispatch({
          type: RESET_ERRORS,
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

export const searchposts = (searchData) => (dispatch) => {
  axios
    .post("/searchposts", searchData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SEARCH_POSTS,
          payload: res.data.posts,
        });
        dispatch({
          type: RESET_ERRORS,
        });
      }
    })
    .catch((err) => {
      if (err.response.data) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data.responseMsg,
        });
      }
    });
};
