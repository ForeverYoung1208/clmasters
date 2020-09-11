import {SET_CURRENT_USER, LOGOUT_USER } from "../actions/actionTypes"

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
    default:
      return state      
  }

}

export default auth