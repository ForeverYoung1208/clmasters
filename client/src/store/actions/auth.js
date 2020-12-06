import { LOGOUT_USER, SET_CURRENT_USER } from "./actionTypes/auth"

import { loaderHide, loaderShow, setErrorMessage } from "./main"
import { LS } from "../../shared/js/ls"

import { apiLoginUser } from "../../shared/js/api/auth"

export const authLoginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loaderShow('auth'))
    try {
      const res = await apiLoginUser(credentials)
      if (res?.accessToken){
        LS.setItem('user', res)
        dispatch(authSetCurrentUser(res))
      } else {
        dispatch(setErrorMessage(`login errors: ${res}`))
      }

    } catch (error) {
      dispatch(setErrorMessage(`login error: server error ${JSON.stringify(error)}`))
    } finally {
      dispatch(loaderHide('auth'))
    }
    
  }
}

export const authLogoutUser = () => {
  LS.removeItem('user')
	return {
    type: LOGOUT_USER,
	}    
}

export const authSetCurrentUser = (user) => {
	return {
    type: SET_CURRENT_USER,
    user
	}    
}

