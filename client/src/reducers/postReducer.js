import {
  ADD_POST,
  POST_REPLY,
  FETCH_POSTS,
  CURRENT_POST,
  SEARCH_POSTS,
} from "../actions/types";

const initialState = {
  posts: [],
  newpost: "",
  currentpost: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        newpost: action.payload,
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case POST_REPLY:
      return {
        ...state,
        currentpost: action.payload,
      };
    case CURRENT_POST:
      return {
        ...state,
        currentpost: action.payload,
      };
    case SEARCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
}
