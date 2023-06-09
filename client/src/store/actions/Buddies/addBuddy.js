import { postAddBuddy } from "../../../api"
import {
  ADD_BUDDY_ERROR,
  ADD_BUDDY_REQUEST,
  ADD_BUDDY_SUCCESS
} from "../../reducers/types"

export default function addBuddy() {
  return async function (dispatch) {
    dispatch({ type: ADD_BUDDY_REQUEST })
    try {
      //await postAddBuddy(token, email, relation)
      dispatch({
        type: ADD_BUDDY_SUCCESS
      })
    } catch (error) {
      dispatch({
        type: ADD_BUDDY_ERROR,
        payload: error
      })
    }
  }
}
