import { LOGOUT_USER, SET_CURRENT_USER } from "../actions/actionTypes/auth"

const initialState = {
  user: {}
}

const auth = (state = initialState, action) => { 

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.user
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: null
      }
    default:
      return state      
  }

}

export default auth