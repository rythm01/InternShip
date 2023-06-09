import { combineReducers } from "redux"
import auth from "./auth"
import buddies from "./buddies"
import changePassword from "./changePassword"
import resetPassword from "./resetPassword"

export default combineReducers({
  auth,
  changePassword,
  resetPassword,
  buddies
})
