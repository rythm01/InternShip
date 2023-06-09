import { ADD_BUDDY_ERROR, ADD_BUDDY_REQUEST, ADD_BUDDY_SUCCESS } from "./types"

const initialState = {
  loading: false,
  success: false,
  error: null
}

export default function buddies(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_BUDDY_REQUEST:
      return { ...state, loading: true }
    case ADD_BUDDY_SUCCESS:
      return { ...state, loading: false, success: true, error: null }
    case ADD_BUDDY_ERROR:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
