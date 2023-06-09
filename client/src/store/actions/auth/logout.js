import { emptySplitApi } from "../../slice/emptySplitApi"
import { logout as logouted } from "../../slice/mainSlice"

const logout = () => dispatch => {
  dispatch(emptySplitApi.util.resetApiState())
  dispatch(logouted())
}

export default logout
