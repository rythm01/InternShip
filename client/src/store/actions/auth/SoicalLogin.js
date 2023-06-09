import { setAuthError, socialLoggedIn } from "../../slice/mainSlice"

const SocialLogin = (response) => dispatch => {
    try {
        dispatch(socialLoggedIn(response))
    } catch (error) {
        dispatch(setAuthError(error))
    }
}

export default SocialLogin