
import { loggedIn, setAuthError } from "../../slice/mainSlice"

const login = (response) => dispatch => {
  try {
    dispatch(loggedIn(response))
  } catch (error) {
    dispatch(setAuthError(error))
  }
}

export default login
