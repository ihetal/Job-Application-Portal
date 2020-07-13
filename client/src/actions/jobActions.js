import axios from "axios";
import {
  FETCH_POPULAR_JOBS,
  SET_ERRORS,
  SEARCH_JOBS,
  RESET_ERRORS,
  RESET_AUTHORIZATION,
  RESET_ALL_STATE,
  ADD_OPENING,
  FETCH_APPLICATIONS,
  CURRENT_JOB,
  RECOMMENDED_JOBS,
  APPLICATION_BASED_RECOMMENDATIONS,
  PAGINATED_JOBS,
  JOB_LOADING,
} from "./types.js";

export const setcurrentjob = (job) => (dispatch) => {
  dispatch({
    type: CURRENT_JOB,
    payload: job,
  });
};
export const fetchPopularJobs = () => (dispatch) => {
  axios
    .get("/popularjobs")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: FETCH_POPULAR_JOBS,
          payload: res.data.openings,
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

export const searchJobs = (searchData) => (dispatch) => {
  axios
    .post("/searchjobs", searchData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SEARCH_JOBS,
          payload: res.data.openings,
          totalpages: res.data.totalpages,
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

export const addopening = (jobData) => (dispatch) => {
  axios
    .post("/addopening", jobData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: ADD_OPENING,
          payload: res.data.jobopening,
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

export const fetchApplications = () => (dispatch) => {
  axios
    .get("/fetchapplications")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: FETCH_APPLICATIONS,
          payload: res.data.applications,
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

export const getRecommendedJobs = (jobid) => (dispatch) => {
  axios.get(`/jobrecommendation/${jobid}`).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: RECOMMENDED_JOBS,
        payload: res.data.jobs,
      });
      dispatch({
        type: RESET_ERRORS,
      });
    }
  });
};

export const getAppBasedRecommendations = () => (dispatch) => {
  axios.get("/recommendations/applicationbased").then((res) => {
    if (res.status === 200) {
      dispatch({
        type: APPLICATION_BASED_RECOMMENDATIONS,
        payload: res.data.jobs,
      });
      dispatch({
        type: RESET_ERRORS,
      });
    }
  });
};

export const getPaginatedJobs = (searchData) => (dispatch) => {
  axios
    .post("/paginatedjobs", searchData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: PAGINATED_JOBS,
          payload: res.data.openings,
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

export const setJobLoading = () => (dispatch) => {
  dispatch({
    type: JOB_LOADING,
    payload: true,
  });
};
