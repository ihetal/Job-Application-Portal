import {
  FETCH_POPULAR_JOBS,
  SEARCH_JOBS,
  ADD_OPENING,
  FETCH_APPLICATIONS,
  CURRENT_JOB,
  RECOMMENDED_JOBS,
  APPLICATION_BASED_RECOMMENDATIONS,
  PAGINATED_JOBS,
  JOB_LOADING,
} from "../actions/types.js";
const initialState = {
  jobopenings: [],
  openjob: {},
  searchresults: [],
  newjobposted: "",
  applications: [],
  currentjob: "",
  application_based_recommendations: [],
  totalpages: 1,
  recommendedjobs: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POPULAR_JOBS:
      return {
        ...state,
        jobopenings: action.payload,
      };
    case SEARCH_JOBS:
      return {
        ...state,
        searchresults: action.payload,
        totalpages: action.totalpages,
        loading: false,
      };

    case ADD_OPENING:
      return {
        ...state,
        newjobposted: action.payload,
      };

    case FETCH_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
      };
    case CURRENT_JOB:
      return {
        ...state,
        currentjob: action.payload,
      };
    case RECOMMENDED_JOBS:
      return {
        ...state,
        recommendedjobs: action.payload,
      };
    case APPLICATION_BASED_RECOMMENDATIONS:
      return {
        ...state,
        application_based_recommendations: action.payload,
      };
    case PAGINATED_JOBS:
      return {
        ...state,
        searchresults: action.payload,
        loading: false,
      };
    case JOB_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
