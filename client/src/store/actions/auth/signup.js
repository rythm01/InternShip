import { setAuthError, signedUp } from "../../slice/mainSlice"

const signup = (response) => dispatch => {
  try {
    dispatch(signedUp(response))
  } catch (error) {
    dispatch(setAuthError(error))
  }
}

export default signup
