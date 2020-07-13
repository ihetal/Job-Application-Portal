import {
  SET_ERRORS,
  RESET_ERRORS,
  RESET_AUTHORIZATION,
  SET_AUTHENTICATED,
  IS_EMPLOYER,
} from "../actions/types.js";

const initialState = {
  errors: "",
  isAuthenticated: false,
  toProfile: false,
  isemployer: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        errors: "",
        isAuthenticated: true,
        toProfile: action.payload,
      };
    case RESET_AUTHORIZATION:
      return {
        ...state,
        errors: action.error,
        isAuthenticated: action.isAuthenticated,
      };
    case RESET_ERRORS:
      return {
        ...state,
        errors: "",
      };
    case IS_EMPLOYER:
      return {
        ...state,
        isemployer: action.payload,
      };
    default:
      return state;
  }
}
