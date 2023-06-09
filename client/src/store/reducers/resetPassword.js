import {
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from "./types"

const initialState = {
  loading: false,
  success: false,
  email: null,
  error: null
}

export default function resetPassword(state = initialState, { type, payload }) {
  switch (type) {
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, email: payload }
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true, error: null }
    case RESET_PASSWORD_ERROR:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
