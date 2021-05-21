import { combineReducers } from "redux";
import sidebarReducer from "./SideBar/reducer";
import loginReducer from "./Login/reducer";
import signupReducer from "./Signup/reducer";
import usersReducer from "./User/usersReducer";
import appReducer from "./App/appReducer";

import authReducer from "./auth/authReducer";
const rootReducer = combineReducers({
  sidebarReducer,
  loginReducer,
  signupReducer,
  usersReducer,
  appReducer,
  authReducer,
});
export default rootReducer;
