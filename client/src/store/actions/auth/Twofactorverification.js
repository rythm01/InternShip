
import { setAuthError, signedUp } from "../../slice/mainSlice";

const Twofactorverification = (code) => dispatch => {
  try {
    dispatch(signedUp(code))
  } catch (error) {
    dispatch(setAuthError(error))
  }
}

export default Twofactorverification;