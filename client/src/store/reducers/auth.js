import { AUTH_ERROR, CLEAR_USER, SET_USER, SET_SIGNUP, SET_SOCIALLOGIN } from "./types"

const initialState = {
  loggedIn: false,
  user: null,
  token: null,
  error: null,
  signUp: false,
}

export default function auth(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user.response,
        loggedIn: true,
        error: null,
        token: payload.user.token
      }
    case SET_SIGNUP:
      return {
        ...state,
        signUp: true,
        token: payload.token
      }
    case SET_SOCIALLOGIN:
      return {
        ...state,
        user: payload.user,
        loggedIn: true,
        token: payload.user.key
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: payload
      }
    case CLEAR_USER:
      return initialState
    default:
      return state
  }
}
