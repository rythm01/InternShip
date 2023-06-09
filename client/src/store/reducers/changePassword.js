import {
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS
} from "./types"

const initialState = {
  loading: false,
  success: false,
  error: null
}

export default function changePassword(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true }
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true, error: null }
    case CHANGE_PASSWORD_ERROR:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
