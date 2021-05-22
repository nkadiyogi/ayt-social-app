import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  error: null,
  triggerUpdate: Date.now(),
  users: [
    {
      firstName: "shiv",
      lastName: "MAlviya",
      email: "test12344@mail.com",
      role: 0,
      phone: "7742401557",
    },
    {
      firstName: "Narendra",
      lastName: "MAlviya",
      email: "test12344@mail.com",
      role: 1,
      phone: "7742401557",
    },
    {
      firstName: "Kailash",
      lastName: "MAlviya",
      email: "test12344@mail.com",
      role: 0,
      phone: "7742401557",
    },
  ],
};
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRIGGER_USERS_UPDATE:
      return {
        ...state,
        triggerUpdate: Date.now(),
      };
    case actionTypes.GET_USERS_REQUEST:
      return {
        ...state,
        users: [],
        loading: true,
      };
    case actionTypes.GET_USERS_FAILED:
      return {
        ...state,
        users: [],
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default usersReducer;
