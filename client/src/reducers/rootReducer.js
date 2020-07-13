import { combineReducers } from "redux";
import jobReducer from "./jobReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import { RESET_ALL_STATE } from "../actions/types";
const appReducer = combineReducers({
  jobs: jobReducer,
  posts: postReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_ALL_STATE) {
    state = undefined;
    localStorage.removeItem("state");
  }

  return appReducer(state, action);
};

export default rootReducer;
