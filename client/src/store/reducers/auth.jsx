import { LOGIN_USER, SET_CURRENT_USER, LOGOUT_USER, LOGIN_USER_ERROR } from "../actions/actionTypes"

const initialState = {
  user: {}
}

const auth = (state = initialState, action) => { 

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload.user
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: null
      }
    case LOGIN_USER_ERROR:
      
    default:
      return state      
  }

}

export default auth