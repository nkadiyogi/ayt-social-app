import * as actionTypes from "./authActionTypes";
const initialStateObj = {
  loading: false,
  isSignedIn: false,
  userData: {},
  profile: {
    id: 0,
    name: "John Doe",
    registered: "2018/01/01",
    role: "Guest",
    status: "Pending",
  },
  msg: "",
  error: "",
};
const initialState = { ...initialStateObj };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isSignedIn: false,
        loading: true,
        error: "",
        userData: {},
        msg: "",
      };

    case actionTypes.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSignedIn: true,
        error: "",
        userData: action.payload,
        msg: "",
      };
    case actionTypes.LOGIN_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        isSignedIn: false,
        userData: {},
        error: action.payload,
      };
    case actionTypes.LOG_OUT:
      return { ...initialStateObj };
    // user profile request
    case actionTypes.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        profile: {},
        error: "",
      };
    case actionTypes.GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        profile: {},
        error: action.payload,
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    // user forgot password request
    case actionTypes.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FORGOT_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
        error: "",
      };
    default:
      return state;
  }
};

export default authReducer;
